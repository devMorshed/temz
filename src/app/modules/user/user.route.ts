import { Router } from "express";
import { UserContoller } from "./user.controller";

const router = Router();

router.get("/", UserContoller.getUser);

export const UserRoutes = router;
