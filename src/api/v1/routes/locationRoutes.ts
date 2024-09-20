import { Router } from "express";
import {
  getCountries,
  getCities,
  getStates
} from "../controllers/locationController";

const router = Router();

router
  .get('/countries', getCountries)
  .get('/cities/:country/:state', getCities)
  .get('/states/:country', getStates)

export default router;
