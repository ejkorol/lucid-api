import { Router } from "express";
import {
  postDream
} from "@/api/v1/controllers/dreamController";
import { authHandler } from "@/api/middleware/auth";

const router = Router();

router
  .post('/:userId', authHandler, postDream)

export default router;
