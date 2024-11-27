import jwt from "jsonwebtoken";
import user from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    console.log(authHeader, "authHeader"); // Logs the full Authorization header
    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });
  
    // Extract the token after "Bearer "
    const token = authHeader.split(' ')[1];
  
    if (!token) return res.status(401).json({ message: 'Unauthorized - Token missing' });
  
    try {
      console.log(process.env.JWT_SECRET, "process.env.JWT_SECRET");
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      console.log(decoded, "decoded");
      req.user = await user.findById(decoded.id).select('-password'); // Attach user to request
      next();
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(401).json({ error: err.message, message: 'Invalid token' });
    }
  };
  

  export  const adminMiddleware = (req, res, next) => {
    console.log(req.user,"checkusers")
        if (req.user.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied' });
        }
        next();
}