import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const modulePath = [{ path: "/users", route: UserRoutes }];

modulePath.forEach((r) => router.use(r.path, r.route));

export default router;
