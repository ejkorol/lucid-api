import { Router } from "express";
import {
  signup,
  signin,
  verify
} from "../controllers/authController";

const router = Router();

router
  .post('/signup', signup)
  .post('/signin', signin)
  .post('/verify/:credential', verify)

export default router;
