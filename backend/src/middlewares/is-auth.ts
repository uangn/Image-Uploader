import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AuthRequest from "models/AuthRequest";

const auth: RequestHandler = (req: AuthRequest, res, next) => {
  const tokeen = req.get("Authorization")?.split(" ")[1] as string;
  let decodedToken;
  try {
    decodedToken = jwt.verify(tokeen, "mayakepatum") as JwtPayload;
  } catch (err) {
    return res.status(404).json("not login");
  }

  req.userId = decodedToken.userId;
  req.username = decodedToken.username;
  next();
};
export default auth;
