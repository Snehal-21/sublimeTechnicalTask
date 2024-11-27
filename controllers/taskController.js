import Task from "../models/Task.js";

export const addTask = async (req, res) => {
    try {
      const task = await Task.create({ ...req.body, createdBy: req.user.id });
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  export const getTasks = async (req, res) => {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};
  
    try {
      const tasks = await Task.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .sort({ dueDate: 1 });
      const total = await Task.countDocuments(query);
      res.status(200).json({ tasks, total });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  export const updateTask = async (req, res) => {
    try {
        console.log(req.params.id,"req.params.id")
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.status(200).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.body.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };