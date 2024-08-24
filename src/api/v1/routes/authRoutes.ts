import { Router } from "express";
import {
  signup,
  signin
} from "../controllers/authController";

const router = Router();

router
  .post('/signup', signup)
  .post('/signin', signin)

export default router;
