import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../configs/system";

export const index = async (req: Request, res: Response) => {
  try {
    const songs = await Song.find({ status: "active", deleted: false });

    res.render("admin/pages/songs/index", {
      pageTitle: "Trang Quản Lý Bài Hát",
      songs: songs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const topics = await Topic.find({
      deleted: false,
    });

    const singers = await Singer.find({
      deleted: false,
    }).select("fullName");

    res.render("admin/pages/songs/create", {
      pageTitle: "Thêm mới bài hát",
      topics: topics,
      singers: singers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    req.body.avatar = req.body.avatar[0];
    req.body.audio = req.body.audio[0];

    const song = new Song(req.body);
    await song.save();

    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
  } catch (error) {
    console.log(error);
  }
};

export const edit = async (req: Request, res: Response) => {
  try {
    const songId = req.params.id;

    const topics = await Topic.find({
      deleted: false,
    });

    const singers = await Singer.find({
      deleted: false,
    });

    const song = await Song.findOne({
      _id: songId,
      deleted: false,
    });

    res.render("admin/pages/songs/edit", {
      pageTitle: "Trang chỉnh sửa bài hát",
      song,
      topics,
      singers,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editPatch = async (req: Request, res: Response) => {
  try {
    const songId = req.params.id;

    if (req.body.avatar) {
      req.body.avatar = req.body.avatar[0];
    }

    if (req.body.audio) {
      req.body.audio = req.body.audio[0];
    }

    await Song.updateOne(
      {
        _id: songId,
        deleted: false,
      },
      req.body
    );

    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};
