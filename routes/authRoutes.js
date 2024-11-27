import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import user from "../models/user.js";
import { adminMiddleware, authMiddleware } from "../middleware/authMiddleware.js";
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js";

const router= express.Router();

router.post('/register', async (req, res) => {
    try {
      const users = await user.create(req.body);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const users = await user.findOne({ username });
      if (!users || !(await bcrypt.compare(password, users.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: users._id, role: users.role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      res.status(200).json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.post('/addTask', authMiddleware, addTask);
router.get('/getTasks', authMiddleware,adminMiddleware, getTasks);
router.put('/updateTask/:id', authMiddleware,adminMiddleware, updateTask);
router.delete('/deleteTask', authMiddleware,adminMiddleware, deleteTask);

  export default router;