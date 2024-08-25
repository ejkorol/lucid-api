import { Router } from "express";
import authRoutes from "./authRoutes";
import dreamRoutes from "./dreamRoutes";

const router = Router();

router.use('/auth', authRoutes);
router.use('/dreams', dreamRoutes);

export default router;
