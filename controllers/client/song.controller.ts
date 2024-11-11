import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

export const index = async (req: Request, res: Response) => {
  try {
    const slugTopic = req.params.slugTopic;

    const songTopic = await Topic.findOne({
      deleted: false,
      slug: slugTopic,
    }).select("id");

    const songs = await Song.find({
      deleted: false,
      topicId: songTopic.id,
    });

    for (const song of songs) {
      const singer = await Singer.findOne({
        _id: song.singerId,
      });

      songs[`singerFullName`] = singer.fullName;
    }

    res.render("client/pages/songs/index", {
      pageTitle: "Trang Danh sách Bài hát",
      songs: songs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const detail = async (req: Request, res: Response) => {
  try {
    const slugSong = req.params.slugSong;

    const song = await Song.findOne({
      slug: slugSong,
      deleted: false,
    });

    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
    });

    const topic = await Topic.findOne({
      _id: song.topicId,
      deleted: false,
    });

    res.render("client/pages/songs/detail", {
      pageTitle: "Trang Chi tiết Bài hát",
      song: song,
      topic: topic,
      singer: singer,
    });
  } catch (error) {
    console.log(error);
  }
};
