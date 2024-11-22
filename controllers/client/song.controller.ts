import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import FavoriteSong from "../../models/favorite-song.model";
import unidecode from "unidecode";

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

    const existSongInFavorite = await FavoriteSong.findOne({
      songId: song.id,
    });

    if (existSongInFavorite) {
      song["favorite"] = true;
    } else {
      song["favorite"] = false;
    }

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

export const likePatch = async (req: Request, res: Response) => {
  try {
    const songId = req.body.id;
    const status = req.body.status;

    const song = await Song.findOne({
      _id: songId,
      status: "active",
      deleted: false,
    });

    if (!song) {
      res.json({ code: "error" });
      return;
    }

    let updateLike = song.like;

    switch (status) {
      case "like":
        updateLike += 1;
        break;

      case "dislike":
        updateLike -= 1;
        break;

      default:
        break;
    }

    await Song.findByIdAndUpdate(songId, {
      like: updateLike,
    });

    res.json({
      code: "success",
      like: updateLike,
    });
  } catch (error) {
    console.log(error);
  }
};

export const favoritePatch = async (req: Request, res: Response) => {
  try {
    const songId = req.body.id;

    const song = await Song.findOne({
      _id: songId,
      status: "active",
      deleted: false,
    });

    if (!song) {
      res.json({
        code: "error",
      });

      return;
    }

    const existSongInFavorite = await FavoriteSong.findOne({
      songId: songId,
    });

    if (existSongInFavorite) {
      await existSongInFavorite.deleteOne({
        songId: songId,
      });

      res.json({
        code: "success",
        message: "Xoá bài hát khỏi danh sách yêu thích thành công",
      });

      return;
    }

    const newFavoriteSong = new FavoriteSong({ songId: songId });

    await newFavoriteSong.save();

    res.json({
      code: "success",
      message: "Thêm bài hát vào danh sách yêu thích thành công",
    });
  } catch (error) {
    console.log(error);
  }
};

export const favorite = async (req: Request, res: Response) => {
  try {
    const songs = await FavoriteSong.find({});

    for (const song of songs) {
      const infoSong = await Song.findOne({
        _id: song.songId,
      });

      const infoSinger = await Singer.findOne({
        _id: infoSong.singerId,
      });

      song["singerFullName"] = infoSinger.fullName;
      song["title"] = infoSong.title;
      song["slug"] = infoSong.slug;
      song["avatar"] = infoSong.avatar;
    }

    res.render("client/pages/songs/favorite", {
      pageTitle: "Bài hát yêu thích",
      songs: songs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const search = async (req: Request, res: Response) => {
  try {
    const type = req.params.type;
    const keyword = `${req.query.keyword}`;

    let keywordRegex = keyword.trim();
    keywordRegex = keywordRegex.replace(/\s+/g, "-");
    keywordRegex = unidecode(keywordRegex);

    const slugRegex = new RegExp(keywordRegex, "i");

    const songs = await Song.find({
      slug: slugRegex,
    })
      .select("slug avatar title like singerId")
      .lean();

    for (const song of songs) {
      const infoSinger = await Singer.findOne({
        _id: song.singerId,
        deleted: false,
      });

      song["singerFullName"] = infoSinger ? infoSinger.fullName : "";
    }

    if (type === "result") {
      res.render("client/pages/songs/search", {
        pageTitle: `Kết quả tìm kiếm: ${keyword}`,
        keyword: keyword,
        songs: songs,
      });
    } else if (type === "suggest") {
      res.json({
        code: "success",
        songs: songs,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const listenPatch = async (req: Request, res: Response) => {
  try {
    const songId = req.params.id;

    const existSong = await Song.findOne({
      _id: songId,
      status: "active",
      deleted: false,
    });

    if (!existSong) {
      res.json({
        code: "error",
        message: "Bài hát này không tồn tại",
      });
      return;
    }

    const updateListen = (existSong.listen ? existSong.listen : 0) + 1;

    await Song.findByIdAndUpdate(songId, {
      listen: updateListen,
    });

    res.json({
      code: "success",
      listen: updateListen,
    });

  } catch (error) {
    console.log(error);
  }
};
