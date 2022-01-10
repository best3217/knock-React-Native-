import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status-codes";
import { verifyToken } from "../security";
import { V2_CUSTOM_TOKEN } from '../config/constants'

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const authorizationHeader = req.header("Authorization");

  if (!authorizationHeader) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "No authorization provided." });
  }

  try {
    const token = authorizationHeader.replace("Bearer ", "");
    const { email, fname, lname, role, id } = verifyToken(token);

    req.body.tokenPayload = {
      email,
      fname,
      lname,
      role,
      id
    };

    next();
  } catch (error) {
    console.error('Authorization flow: ', error);
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Wrong authorization token sent. Please login." });
  }
};

export const authenticateV2 = (req: Request, res: Response, next: NextFunction) => {
  if (req.header('Authorization') !== V2_CUSTOM_TOKEN) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Incorrect token.' })
  }
  next()
}
