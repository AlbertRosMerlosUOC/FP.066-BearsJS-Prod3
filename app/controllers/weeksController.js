const Week = require('../models/Week');

const getWeeks = async () => {
  return await Week.find();
};

const getWeekById = (root, args) => {
  return Week.findById(args._id).exec();
}

module.exports = {
  getWeeks,
  getWeekById,
};
