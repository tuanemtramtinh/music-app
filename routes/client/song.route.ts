import express, { Router } from "express";
import * as controller from "../../controllers/client/song.controller";

const router: Router = express.Router();

router.get("/:slugTopic", controller.index);

router.get("/detail/:slugSong", controller.detail);

const songRoute = router;

export default songRoute;
