import jwt from "jsonwebtoken";

export const isAdminAuthenticated = (req, res, next) => {
  const token = req.cookies["jwt-token-admin"];
    console.log('jwt-token-admin',token);

  if (!token) {
    return res.status(401).json({
      message: "You are not authenticated admin",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};