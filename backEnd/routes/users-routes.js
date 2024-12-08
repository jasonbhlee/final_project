const express = require('express');
const { check } = require('express-validator');
const usersControllers = require('../controllers/users-controllers');
const router = express.Router();

// Route to create a new user with updated validation
router.post(
    '/',
    [
      check('userFirstName').not().isEmpty().withMessage('First name is required.'),
      check('email').isEmail().withMessage('Invalid email format.'),
      check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    ],
    usersControllers.createUser
);

// Route to login a user
router.post(
    '/login',
    [
      check('email').isEmail().withMessage('Invalid email format.'),
      check('password').exists().withMessage('Password is required.')
    ],
    usersControllers.loginUser
);

module.exports = router;
