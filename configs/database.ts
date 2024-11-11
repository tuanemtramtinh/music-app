import { error } from "console";
import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Kết nối database thành công");
    })
    .catch((error) => {
      console.log(error);
      console.log("Kết nối database không thành công");
    });
};
