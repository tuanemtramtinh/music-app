import express, { Router } from "express";
import * as controller from "../../controllers/admin/song.controller";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";
import multer from "multer";

const router: Router = express.Router();

const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.single("avatar"),
  uploadSingle,
  controller.createPost
);

const songRoute = router;

export default songRoute;
