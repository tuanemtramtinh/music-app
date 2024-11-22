import { Request, Response } from "express";

export const index = (req: Request, res: Response) => {
  try {
    res.render("admin/pages/dashboard/index", {
      pageTitle: "Tổng quan"
    })
  } catch (error) {
    console.log(error);
  }
};
