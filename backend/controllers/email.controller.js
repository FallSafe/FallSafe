import nodemailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE } from "../email/emailTemplates";
import dotenv from "dotenv";
dotenv.config();

export const sendVerificationEmail = async (req, res) => {
  console.log("Received request to send verification code.");

  const { email, verificationToken } = req.body;
  if (!email) {
    console.error("No email provided in the request body.");
    return res.status(400).json({ message: "Email is required" });
  }

  console.log("Email to send verification code to:", email);
  console.log("Generated verification code:", verificationToken);

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error("SMTP connection error:", error);
    } else {
      console.log("SMTP server is ready to send emails");
    }
  });

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };

  try {
    console.log("Attempting to send verification email...");
    await transporter.sendMail(mailOptions);
    console.log("Verification email successfully sent to:", email);

    res.status(200).json({
      message: "Verification email sent successfully",
      code: verificationCode,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error });
  }
};
