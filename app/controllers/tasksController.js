const Task = require('../models/Task');

const getTasks = async () => {
  return await Task.find().populate('_id_week');
};

const getTaskById = (root, args) => {
  return Task.findById(args._id).populate('_id_week').exec();
}

const getTasksByWeek = async (_, { _id_week }) => {
  const tasks = await Task.find({ _id_week: _id_week }).populate('_id_week');
  return tasks;
};

module.exports = {
  getTasks,
  getTaskById,
  getTasksByWeek,
};
