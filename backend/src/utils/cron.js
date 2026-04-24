const Task = require("../models/task.model");
const Notification = require("../models/notification.model");
const { Op } = require("sequelize");

const runCron = () => {
  setInterval(async () => {
    console.log("Running background job...");

    const overdueTasks = await Task.findAll({
      where: {
        dueDate: {
          [Op.lt]: new Date(),
        },
        status: {
          [Op.ne]: "done",
        },
      },
    });

    for (let task of overdueTasks) {
      const exists = await Notification.findOne({
        where: {
          taskId: task.id,
          type: "overdue",
        },
      });

      if (!exists) {
        await Notification.create({
          message: `Task "${task.title}" is overdue`,
          type: "overdue",
          taskId: task.id,
          userId: task.assignedTo || null, // or map properly
        });
      }
    }
  }, 60000); // every 1 minute
};

module.exports = runCron;
