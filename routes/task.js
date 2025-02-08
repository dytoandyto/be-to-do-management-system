var express = require('express');
var router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all task
router.get('/get-all', async function (req, res) {
  const task = await prisma.task.findMany();
  if (task.length === 0 || task === null || task === undefined) {
    res.json('No task found');
  }
  res.json(task);
});

// Create Task
router.post('/create-task', async function (req, res) {
  const { title, desc, priority, deadline, is_done, created_by } = req.body;
  if (is_done === undefined || is_done === null) {
    const task = await prisma.task.create({
      data: {
        title,
        desc,
        priority,
        deadline: new Date(deadline),
        is_done: false,
        created_by,
      },
    });
    res.send(task);
  } else {
    const task = await prisma.task.create({
      data: {
        title,
        desc,
        priority,
        deadline: new Date(deadline),
        is_done,
        created_by,
      },
    });
    res.send(task);
  }
});

// Update Task
router.put('/update-task/:id', async function (req, res) {
  const { id } = req.params;
  const { title, desc, priority, deadline, is_done, create_by } = req.body;
  if (is_done === undefined || is_done === null) {
    const task = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        desc: desc,
        priority: priority,
        deadline: deadline,
        is_done: is_done,
        create_by: create_by,
      },
    });
    res.send(task);
  } else {
    const task = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title: title,
        desc: desc,
        priority: priority,
        deadline: deadline,
        is_done: is_done,
        create_by: create_by,
      },
    });
    res.body(task);
  }
});

// Delete Task
router.delete('/delete-task/:id', async function (req, res) {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(task);
});
module.exports = router;
