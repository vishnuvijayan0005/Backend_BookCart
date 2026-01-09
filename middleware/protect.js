import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    // No token
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

 

    return next();   
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid token or expired session" });
  }
};
