const express = require('express');
const _ = require('lodash');
const prisma = require('../prisma/Client');
const bcrypt = require('bcryptjs');

const router = express.Router();

// /api/users
// Get all users (admin only)
router.get('/', async (req, res) => {
  // TODO: Add authentication and admin middleware here
  const users = await prisma.user.findMany();
  res.json(users);
});

// Register a new user
router.post('/', async (req, res) => {
  // TODO: Add error handling after validation is done

  const checkUser = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (checkUser) return res.status(400).send('User already registered.');

  const data = _.pick(req.body, ['email', 'password', 'name']);
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  const user = await prisma.user.create({
    data: { ...data },
  });
  res.json(user);
});

// /api/users/me
// Get the profile of the logged-in user
router.get('/me', async (req, res) => {
  // TODO: Add authentication middleware here
  const user = await prisma.user.findUnique({
    where: {
      user_id: req.user.user_id,
    },
  });
  res.json(user);
});

// Update the profile of the logged-in user
router.put('/me', async (req, res) => {
  // TODO: Add authentication middleware here
  // TODO: Add error handling after validation is done

  const checkUser = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (checkUser) return res.status(400).send('User already registered.');

  if (req.body.password) {
    const data = _.pick(req.body, ['email', 'password', 'name']);
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const updatedUser = await prisma.user.update({
      where: {
        user_id: req.user.user_id,
      },
      data: { ...data },
    });
    res.json(updatedUser);
  }

  if (!req.body.password) {
    const data = _.pick(req.body, ['email', 'name']);
    const updatedUser = await prisma.user.update({
      where: {
        user_id: req.user.user_id,
      },
      data: { ...data },
    });
    res.json(updatedUser);
  }
});

// Get user profile by ID (admin only)
router.get('/:user_id', async (req, res) => {
  // TODO: Add authentication and admin middleware here
  const user = await prisma.user.findUnique({
    where: {
      user_id: parseInt(req.params.user_id),
    },
  });
  res.json(user);
});

// Delete user by ID (admin only)
router.delete('/:user_id', async (req, res) => {
  // TODO: Add authentication and admin middleware here
  const user = await prisma.user.delete({
    where: {
      user_id: parseInt(req.params.user_id),
    },
  });
  res.json(user);
});

module.exports = router;
