import express, { Application, Request, Response } from "express";
import cors from "cors";
import v1Routes from "./api/v1";
import { errorHandler } from "./api/middleware/errorHandler";

const api: Application = express();

api.use(express.json());
api.use(cors());

api.use('/api/v1', v1Routes);

/* ********************* */
/*     ERROR HANDLER     */
/* ********************* */
api.use(errorHandler);

/*
 * Error handler middleware must be declared after all routes
 * to allow it to catch errors thrown from the routes.
 */

api.get('/', (_req: Request, res: Response) => {
  res.send('API running');
});

export default api;
