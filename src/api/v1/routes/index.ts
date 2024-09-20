import { Router } from "express";
import authRoutes from "./authRoutes";
import dreamRoutes from "./dreamRoutes";
import mbtiRoutes from "./mbtiRoutes";
import locationRoutes from "./locationRoutes";
import accountRoutes from "./accountRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/dreams", dreamRoutes);
router.use("/mbti", mbtiRoutes);
router.use("/locations", locationRoutes);
router.use("/account", accountRoutes);

export default router;
