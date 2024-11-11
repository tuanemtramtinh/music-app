"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./configs/database");
const index_route_1 = __importDefault(require("./routes/client/index.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
(0, database_1.connectDB)();
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express_1.default.static(`${__dirname}/public`));
(0, index_route_1.default)(app);
app.listen(PORT, () => {
    console.log(`Server đang lắng nghe trên cổng ${PORT}`);
});
