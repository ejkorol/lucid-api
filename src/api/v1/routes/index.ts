import { Router } from "express";
import authRoutes from "./authRoutes";
import dreamRoutes from "./dreamRoutes";
import mbtiRoutes from "./mbtiRoutes";

const router = Router();

router.use('/auth', authRoutes);
router.use('/dreams', dreamRoutes);
router.use('/mbti', mbtiRoutes);

export default router;
