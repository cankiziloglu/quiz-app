const express = require('express');
const prisma = require('../prisma/Client');

const router = express.Router();

// /api/users
// Get all users (admin only)
router.get('/', async (req, res) => {
  // TODO: Add authentication and admin middleware here
});

// Register a new user
router.post('/', async (req, res) => {});

// /api/users/me
// Get the profile of the logged-in user
router.get('/me', async (req, res) => {
  // TODO: Add authentication middleware here
});

// Update the profile of the logged-in user
router.put('/me', async (req, res) => {
  // TODO: Add authentication middleware here
});

// Get user profile by ID (admin only)
router.get('/:user_id', async (req, res) => {
  // TODO: Add authentication and admin middleware here
});

// Delete user by ID (admin only)
router.delete('/:user_id', async (req, res) => {
  // TODO: Add authentication and admin middleware here
});

module.exports = router;
