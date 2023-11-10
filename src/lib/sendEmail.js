import { createTransport } from "nodemailer"

const defaultServer = {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: true,
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
    }
}
export const sendEmail = async ({ server = defaultServer, email, text, html, subject }) => {

    const transport = createTransport(server)
    const result = await transport.sendMail({
        to: email,
        from: process.env.EMAIL_FROM,
        subject,
        text,
        html,

    })

    const failed = result.rejected.concat(result.pending).filter(Boolean)
    if (failed.length) {
        console.log("Error while sending email")
        throw new Error(`Email(s) (${failed.join(", ")}) could not be sent!`)
    }

    return result;
}