import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/database";
import routeClient from "./routes/client/index.route";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`)); // Thiết lập thư mục chứa file tĩnh

routeClient(app);

app.listen(PORT, () => {
  console.log(`Server đang lắng nghe trên cổng ${PORT}`);
});
