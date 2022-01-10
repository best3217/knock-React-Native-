import express from "express";
import {
  login,
  signup,
  resendEmailVerify,
  verifyEmail,
  sendForgotPasswordLink,
  verifyForgotPassword,  
  requestEmailUpdate,
  resetPassword,
  UpdateStep2
} from "../controllers/auth";
import { authenticate } from "../middleware/auth";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/resend-verify-email", authenticate, resendEmailVerify);
authRouter.post("/verify-email", verifyEmail);
authRouter.post("/submit_auth2", authenticate, UpdateStep2);
authRouter.post("/forgot", sendForgotPasswordLink);
authRouter.post("/verify-forgot", verifyForgotPassword);
authRouter.post('/request-email-update', authenticate, requestEmailUpdate)
authRouter.post('/reset-password', authenticate, resetPassword)

export default authRouter;
