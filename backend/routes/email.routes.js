import express from "express";
import { sendVerificationEmail } from "../controllers/email.controller";

const router = express.Router();

router.post("/send-verification-code", sendVerificationEmail);

export default router;
