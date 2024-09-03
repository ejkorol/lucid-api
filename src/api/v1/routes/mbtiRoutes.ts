import { Router } from "express";
import {
  getPersonalities
} from "../controllers/mbtiController";

const router = Router();

router
  .get('/', getPersonalities);

export default router;
