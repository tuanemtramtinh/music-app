import express, { Router } from "express";
import * as controller from "../../controllers/client/song.controller";

const router: Router = express.Router();

router.get("/favorite", controller.favorite);

router.get("/detail/:slugSong", controller.detail);

router.patch("/like", controller.likePatch);

router.patch("/favorite", controller.favoritePatch);

router.get("/search/:type", controller.search);

router.patch("/listen/:id", controller.listenPatch);

router.get("/:slugTopic", controller.index);



const songRoute = router;

export default songRoute;
