// Importar los controladores
const weeksController = require('../controllers/weeksController');
const tasksController = require('../controllers/tasksController');

// Crear el objeto resolvers
const resolvers = {
  Query: {
    // Resolver para obtener todas las semanas
    getWeeks: weeksController.getWeeks,
    // Resolver para obtener una semana por _id
    getWeekById: weeksController.getWeekById,
    // Resolver para obtener todas las tareas
    getTasks: tasksController.getTasks,
    // Resolver para obtener una tarea por _id
    getTaskById: tasksController.getTaskById,
    // Resolver para obtener todas las tareas por un _id de una semana
    getTasksByWeek: tasksController.getTasksByWeek,
  }
};

// Exportar el objeto resolvers
module.exports = resolvers;
