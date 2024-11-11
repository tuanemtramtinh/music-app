"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detail = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugTopic = req.params.slugTopic;
        const songTopic = yield topic_model_1.default.findOne({
            deleted: false,
            slug: slugTopic,
        }).select("id");
        const songs = yield song_model_1.default.find({
            deleted: false,
            topicId: songTopic.id,
        });
        for (const song of songs) {
            const singer = yield singer_model_1.default.findOne({
                _id: song.singerId,
            });
            songs[`singerFullName`] = singer.fullName;
        }
        res.render("client/pages/songs/index", {
            pageTitle: "Trang Danh sách Bài hát",
            songs: songs,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.index = index;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slugSong = req.params.slugSong;
        const song = yield song_model_1.default.findOne({
            slug: slugSong,
            deleted: false,
        });
        const singer = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false,
        });
        const topic = yield topic_model_1.default.findOne({
            _id: song.topicId,
            deleted: false,
        });
        res.render("client/pages/songs/detail", {
            pageTitle: "Trang Chi tiết Bài hát",
            song: song,
            topic: topic,
            singer: singer,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.detail = detail;
