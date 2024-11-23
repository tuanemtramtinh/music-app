import express, { Router } from "express";
import multer from "multer";
import { uploadSingle } from "../../middlewares/admin/uploadCloud.middleware";
import * as controller from "../../controllers/admin/upload.controller";

const router: Router = express.Router();

const upload = multer();

router.post("/", upload.single("file"), uploadSingle, controller.index);

const uploadRoute = router;

export default uploadRoute;
