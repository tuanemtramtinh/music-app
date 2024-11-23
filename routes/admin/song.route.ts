import express, { Router } from "express";
import * as controller from "../../controllers/admin/song.controller";
import {
  uploadFields,
  uploadSingle,
} from "../../middlewares/admin/uploadCloud.middleware";
import multer from "multer";

const router: Router = express.Router();

const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadFields,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadFields,
  controller.editPatch
);

const songRoute = router;

export default songRoute;
