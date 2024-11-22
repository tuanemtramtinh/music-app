import mongoose from "mongoose";

const favoriteSongSchema = new mongoose.Schema(
  {
    userId: String,
    songId: String,
  },
  {
    timestamps: true,
  }
);

const FavoriteSong = mongoose.model(
  "favoriteSong",
  favoriteSongSchema,
  "favorite-songs"
);

export default FavoriteSong;