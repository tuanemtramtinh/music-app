import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./configs/database";
import routeClient from "./routes/client/index.route";
import bodyParser from "body-parser";
import { systemConfig } from "./configs/system";
import path from "path";
import { routeAdmin } from "./routes/admin/index.route";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`)); // Thiết lập thư mục chứa file tĩnh

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.get("/", (req: Request, res: Response) => {
  res.redirect("/topics");
});

routeAdmin(app);
routeClient(app);

app.listen(PORT, () => {
  console.log(`Server đang lắng nghe trên cổng ${PORT}`);
});
