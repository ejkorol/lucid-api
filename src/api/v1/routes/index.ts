import { Router } from "express";
import helloWorld from "./helloWorld";

const router = Router();

router.use('/hello-world', helloWorld);

export default router;
