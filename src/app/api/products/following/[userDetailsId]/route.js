import dbConnect from "@/services/dbConnect.service";
import { pageSize } from "@/configs/api.config";
import Follows from "@/models/users/follows";
import Products from "@/models/users/products";
import UsersDetails from "@/models/users/usersDetail";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const GET = async (req, response) => {
  try {
    const userDetailsId = req.url.split("/").at(-1).split("?")[0];
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || 1;

    if (!userDetailsId)
      return NextResponse.json(
        { error: true, errorMessage: "User Id is required!" },
        { status: 400 },
      );

    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json(
        { error: true, errorMessage: "Unauthorized access!" },
        { status: 401 },
      );
    }
    const userDetails = await UsersDetails.findById(userDetailsId);
    if (token.user.id != userDetails?.user) {
      return NextResponse.json(
        { error: true, errorMessage: "Unauthorized access!" },
        { status: 401 },
      );
    }
    const db = await dbConnect();

    const followingRes = await Follows.findOne({ userDetails: userDetailsId });

    if (followingRes == null) {
      return NextResponse.json([], { status: 200 });
    }
    const totalSize = await Products.countDocuments({
      artist: {
        $in: followingRes.following,
      },
    });
    const totalPages = Math.ceil(totalSize / pageSize);

    const productRes = await Products.find({
      artist: {
        $in: followingRes.following,
      },
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate({
        path: "artist",
        populate: {
          path: "user",
          select: "-password",
        },
      });

    const finalData = {
      totalPages,
      pageSize: pageSize,
      page: +page,
      documentSize: productRes.length,
      data: productRes,
    };

    return NextResponse.json(finalData);
  } catch (error) {
    console.log("ERROR OCCURED WHILE FETCHING FOLLOWING PRODUCTS", error);
    return NextResponse.error({ error: true });
  }
};
