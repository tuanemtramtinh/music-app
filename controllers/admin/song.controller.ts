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
    const song = new Song(req.body);
    await song.save();

    res.redirect(`/${systemConfig.prefixAdmin}/songs`);
  } catch (error) {
    console.log(error);
  }
}