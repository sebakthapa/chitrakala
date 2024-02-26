import dbConnect from "../../../services/dbConnect.service";
import PasswordResetTokens from "@/models/tokens/PasswordResetTokens";
import Users from "@/models/users/users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {
  passwordResetHtml,
  passwordResetSuccessHtml,
  passwordResetText,
  passwordResetsuccessText,
} from "../../../configs/emailTemplates.config";
import { sendEmail } from "../../../services/sendEmail.service";
import crypto from "crypto";

const generateHash = (text, saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(text, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

export const POST = async (req) => {
  try {
    const { email } = await req.json();
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    if (!isValidEmail) {
      return NextResponse.json({ error: "Invalid Email!" }, { status: 400 });
    }

    await dbConnect();

    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Email doesn't exist!" },
        { status: 400 },
      );
    }

    let token = await PasswordResetTokens.findOne({ email });
    if (token) {
      await token.deleteOne();
    }

    let resetToken = crypto.randomBytes(32).toString("hex");

    const hash = await generateHash(resetToken);

    const savedData = await new PasswordResetTokens({
      email,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const { origin: host, host: webname } = new URL(req.url);
    const link = `${host}/auth/password-reset?st=create-new-password&token=${resetToken}&email=${email}`;
    const html = passwordResetHtml({ url: link, host });
    const text = passwordResetText({ url: link, host });
    const subject = `Reset Password For ${webname}`;

    const emailRes = await sendEmail({ subject, email, text, html });

    return NextResponse.json(
      { link, message: "Password reset Email sent!" },
      { status: 200 },
    );
  } catch (error) {
    console.log("error while resetting password");
    throw error;
  }
};

export const PATCH = async (req) => {
  try {
    const { token, email, password, confirmPassword } = await req.json();

    if (!password || !confirmPassword) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 403 },
      );
    }

    if (password != confirmPassword) {
      return NextResponse.json(
        { field: "confirmpassword", error: "Confirm Password didn't match." },
        { status: 403 },
      );
    }

    if (!token || !email) {
      return NextResponse.json(
        { error: "Missing some data! Re-click the email link." },
        { status: 401 },
      );
    }

    // const user = await Users.find({ email });
    const tokenData = await PasswordResetTokens.findOne({ email });

    if (!tokenData) {
      return NextResponse.json(
        { error: "Invalid or expired link!" },
        { status: 401 },
      );
    }

    const { expires, token: hashedToken, createdAt } = tokenData;

    const isValid = await bcrypt.compare(token, hashedToken);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid or expired link!" },
        { status: 401 },
      );
    }

    const hashedPassword = await generateHash(password);

    const updatedUser = await Users.findOneAndUpdate(
      { email },
      { password: hashedPassword },
    );
    if (!updatedUser) {
      return NextResponse.json(
        { error: "Unable to reset password." },
        { status: 503 },
      );
    }

    await PasswordResetTokens.findOneAndDelete({ email });

    const { host, origin } = new URL(req.url);
    const html = passwordResetSuccessHtml({ host: origin });
    const text = passwordResetsuccessText({ host: origin });
    const subject = `Password changed for ${host}`;

    const emailRes = await sendEmail({ subject, email, text, html });

    return NextResponse.json(
      { message: "Password changed success." },
      { status: 200 },
    );
  } catch (error) {
    console.log("ERROR while creating new password");
    throw error;
  }
};
