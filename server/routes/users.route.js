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
    .cookie('token', token, {
      httpOnly: true,
      secure: true,
    })
    .send(_.pick(user, ['user_id', 'name', 'email', 'role']), token);
});

// /api/users/me
// Get the profile of the logged-in user
router.get('/me', auth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      user_id: req.user.user_id,
    },
  });
  res.send(
    _.pick(user, [
      'user_id',
      'name',
      'email',
      'role',
      'created_at',
      'updated_at',
    ])
  );
});

// Update the profile of the logged-in user
router.put('/me', auth, async (req, res) => {
  if (req.body.password) {
    const { error } = validateSignup(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const checkUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (checkUser) return res.status(400).send('This email is already in use.');

    const data = _.pick(req.body, ['email', 'password', 'name']);
    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    const updatedUser = await prisma.user.update({
      where: {
        user_id: req.user.user_id,
      },
      data: { ...data },
    });
    res.send(_.pick(updatedUser, ['user_id', 'name', 'email']));
  } else {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const checkUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (checkUser) return res.status(400).send('This email is already in use.');

    const data = _.pick(req.body, ['email', 'name']);
    const updatedUser = await prisma.user.update({
      where: {
        user_id: req.user.user_id,
      },
      data: { ...data },
    });
    res.send(_.pick(updatedUser, ['user_id', 'name', 'email']));
  }
});

// Get user profile by ID (admin only)
router.get('/:user_id', auth, admin, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      user_id: parseInt(req.params.user_id),
    },
  });
  if (!user) return res.status(404).send('User not found.');
  res.send(_.pick(user, ['user_id', 'name', 'email']));
});

// Delete user by ID (admin only)
router.delete('/:user_id', auth, admin, async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      user_id: parseInt(req.params.user_id),
    },
  });
  if (!user) return res.status(404).send('User not found.');
  res.send(_.pick(user, ['user_id', 'name', 'email']));
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

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: true,
    })
    .send(_.pick(user, ['user_id', 'name', 'email', 'role']), token);
});
