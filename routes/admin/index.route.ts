import { Application, Express } from "express";
import { systemConfig } from "../../configs/system";
import dashboardRoute from "./dashboard.route";
import topicRoute from "./topic.route";
import songRoute from "./song.route";

export const routeAdmin = (app: Application) => {
  const path = systemConfig.prefixAdmin;

  app.use(`/${path}/dashboard`, dashboardRoute);
  app.use(`/${path}/topics`, topicRoute);
  app.use(`/${path}/songs`, songRoute);
};
