const express = require('express');
const { check } = require('express-validator');
const usersControllers = require('../controllers/users-controllers');
const router = express.Router();

// this handles registration with validation for name, email, and password
router.post(
    '/',
    [
      check('userFirstName').not().isEmpty().withMessage('First name is required.'),
      check('email').isEmail().withMessage('Invalid email format.'),
      check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
    ],
    usersControllers.createUser
);

// this handles user login with validation for email and password
router.post(
    '/login',
    [
      check('email').isEmail().withMessage('Invalid email format.'),
      check('password').exists().withMessage('Password is required.')
    ],
    usersControllers.loginUser
);

// update user projects when selected or deleted
router.patch('/projects', usersControllers.updateProjects);

// fetches user projects upon their selection through the session
router.get('/projects', usersControllers.getProjects);

// deletes user based on email and password
router.delete('/delete', usersControllers.deleteUser);

// exports the router to be used in the  main app
module.exports = router;
