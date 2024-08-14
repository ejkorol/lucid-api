import express, { Application, Request, Response } from "express";
import cors from "cors";
import v1Routes from "./api/v1";

const api: Application = express();

api.use(express.json());
api.use(cors());

api.use('/api/v1', v1Routes);

api.get('/', (_req: Request, res: Response) => {
  res.send('API running');
});

export default api;
