import express from "express";
import { authenticate } from "../middleware/auth";
import {
  getUserById, getLoggedInUser, updateProfile, searchUsers,
  deleteUser, updateUser, activateUser, updateVerificationDocuments,
  getVerificationDocs, lockUser, unlockUser, loginAsUser, rejectUser, exportUsers,
} from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/me", authenticate, getLoggedInUser);
userRouter.get('/search', authenticate, searchUsers)
userRouter.get('/export', authenticate, exportUsers)
userRouter.put("/verification", authenticate, updateVerificationDocuments);
userRouter.get("/verification_docs", authenticate, getVerificationDocs)
userRouter.get("/login-as/:id", authenticate, loginAsUser)
userRouter.get("/:id", authenticate, getUserById);
userRouter.put("/me", authenticate, updateProfile);
userRouter.put("/:id/lock", authenticate, lockUser)
userRouter.put("/:id/unlock", authenticate, unlockUser)
userRouter.put("/:id/reject", authenticate, rejectUser)
userRouter.put("/:id", authenticate, updateUser);
userRouter.delete("/:id", authenticate, deleteUser);
userRouter.get("/:id/activate", authenticate, activateUser);
userRouter.get("/:id/activate", authenticate, activateUser);

export default userRouter;
