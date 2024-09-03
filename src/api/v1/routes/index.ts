import { Router } from "express";
import authRoutes from "./authRoutes";
import dreamRoutes from "./dreamRoutes";
import mbtiRoutes from "./mbtiRoutes";
import locationRoutes from "./locationRoutes";

const router = Router();

router.use('/auth', authRoutes);
router.use('/dreams', dreamRoutes);
router.use('/mbti', mbtiRoutes);
router.use('/locations', locationRoutes);

export default router;
