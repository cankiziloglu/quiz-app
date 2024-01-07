const express = require('express');
const _ = require('lodash');
const prisma = require('../prisma/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { validateSignup, validateLogin } = require('../models/users.model');

const router = express.Router();

// /api/users
// Get all users (admin only)
router.get('/', auth, admin, async (req, res) => {
    const users = await prisma.user.findMany({
    orderBy: {
      name: 'asc',
    },
  });
  res.json(users);
});

// Register a new user
router.post('/signup', async (req, res) => {
  const { error } = validateSignup(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
  const token = jwt.sign(
    { user_id: user.user_id, role: user.role },
    process.env.JWT_SECRET
  );
  res
    .status(201)
    .header('Authorization', token)
    .send(_.pick(user, ['name', 'email']));
});

// /api/users/me
// Get the profile of the logged-in user
router.get('/me', auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      user_id: req.user.user_id,
    },
  });
  res.json(user);
});

// Update the profile of the logged-in user
router.put('/me', auth, async (req, res) => {
  const { error } = validateSignup(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
});

// Get user profile by ID (admin only)
router.get('/:user_id', auth, admin, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      user_id: parseInt(req.params.user_id),
    },
  });
  res.json(user);
});

// Delete user by ID (admin only)
router.delete('/:user_id', auth, admin, async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      user_id: parseInt(req.params.user_id),
    },
  });
  res.json(user);
});

module.exports = router;

// Login a user
router.post('/login', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = jwt.sign(
    { user_id: user.user_id, role: user.role },
    process.env.JWT_SECRET
  );
  res.send(token);
});
