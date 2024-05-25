import { Request, Response } from "express";
import asyncErrorHandler from "../../../utils/asyncErrorHandler";

const getUser = asyncErrorHandler(async (req: Request, res: Response) => {
  const me = {
    name: "MORSHED",
  };

  res.status(200).json({
    success: true,
    data: me,
  });
});

export const UserContoller = {
  getUser,
};
