import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

 export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Retrieve token from cookies
    if (!token) {
      return res.status(401).json({ message: "Authorization failed: Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Authorization failed: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authorization failed: Invalid token" });
  }
};

