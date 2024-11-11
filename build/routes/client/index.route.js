"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const topic_route_1 = __importDefault(require("./topic.route"));
const song_route_1 = __importDefault(require("./song.route"));
const routeClient = (app) => {
    app.use("/topics", topic_route_1.default);
    app.use("/songs", song_route_1.default);
};
exports.default = routeClient;
