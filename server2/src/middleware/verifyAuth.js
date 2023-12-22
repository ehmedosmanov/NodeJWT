import jwt from "jsonwebtoken";

export const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    res.user = { userId: decodeToken.userId };
    next()
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
