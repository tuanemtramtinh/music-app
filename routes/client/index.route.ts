import { Application } from "express";
import topicRoute from "./topic.route";
import songRoute from "./song.route";

const routeClient = (app: Application) => {
  app.use("/topics", topicRoute);
  app.use("/songs", songRoute);
}

export default routeClient;