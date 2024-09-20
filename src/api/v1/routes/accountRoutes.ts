import { Router } from "express";
import {
  deleteAccount
} from "../controllers/accountController"

const router = Router();

router
  .post('/delete', deleteAccount)

export default router;
