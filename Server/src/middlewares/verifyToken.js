import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const verifyToken = (req, res, next) => {
  // Check if Authorization header is present
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).json({
      success: false,
      message: "Authorization header is missing",
      errorMessage: "Authorization key must be added in header",
    });
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1]; // Assuming 'Bearer <token>' format
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing",
    });
  }

  // Verify token
  jwt.verify(token,process.env.VITE_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Failed to authenticate token",
      });
    }
    
    // Save the user ID from the token
    req.userId = decoded.userId;
    next();
  });
};

export default verifyToken;
