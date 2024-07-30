import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
  currentUser?: any; // Adjust this type as needed based on your JWT payload
}

export const authentification = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("Token received:", token); // Log the token for debugging

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decode) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.currentUser = decode; // Use the extended type here
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
