import express, { Express, Router } from "express";
import * as controller from "../../controllers/admin/dashboard.controller"

const router: Router = express.Router();

router.get("/", controller.index);

const dashboardRoute = router;

export default dashboardRoute;