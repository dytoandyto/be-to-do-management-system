var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all User Tasks
router.get('/get-all', async function (req, res) {
  const userTasks = await prisma.userTask.findMany();
  res.send(userTasks);
});

// Get all User Tasks by User ID
router.get('/get-all/:id', async function (req, res) {
  const { user_id, task_id } = req.params;
  const userTasks = await prisma.userTask.findMany({
    where: {
      user_id: parseInt(user_id),
      task_id: parseInt(task_id),
    },
  });
  res.send(userTasks);
});

// Create User Task
router.post('/create', async function (req, res) {
  const { user_id, task_id } = req.body;
  const userTasks = await prisma.userTask.create({
    data: {
      user_id: parseInt(user_id),
      task_id: parseInt(task_id),
    },
  });
  res.send(userTasks);
});

// Update User Task
router.put(
  '/update-user-task/:user_id_param/:task_id_param',
  async function (req, res) {
    const { user_id_params, task_id_params } = req.params;
    const { user_id, task_id } = req.body;

    const userTask = await prisma.userTask.update({
      where: {
        user_id_task_id: {
          user_id: parseInt(user_id_params),
          task_id: parseInt(task_id_params),
        },
      },
      data: {
        user_id: parseInt(user_id),
        task_id: parseInt(task_id),
      },
    });
    res.send(userTask);
  }
);

// Delete User Task
router.delete('/delete/:id', async function (res, req) {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(user);
});

module.exports = router;
