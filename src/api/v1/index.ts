import { Router } from "express";
import routes from "./routes";

const v1 = Router();

v1.use(routes);

export default v1;
