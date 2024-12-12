const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const HttpError = require('../models/http-error');
const User = require('../models/user');

// Create a new user (Registration)
const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return next(new HttpError('Invalid inputs, please check your info.', 422));
    }

    const { userFirstName, email, password, projects } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new HttpError('User already exists with this email.', 422));
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userFirstName,
            email,
            password: hashedPassword,
            projects: projects || [],
          });

        await newUser.save();

        const responseUser = newUser.toObject({ getters: true });
        delete responseUser.password;

        res.status(201).json({ user: responseUser });
    } catch (err) {
        const error = new HttpError('Creating user failed, please try again later.', 500);
        return next(error);
    }
};

// Update user projects
const updateProjects = async (req, res, next) => {
    const { email, projects } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { email },
        { projects },
        { new: true }
      );
  
      if (!user) {
        return next(new HttpError('User not found.', 404));
      }
  
      res.status(200).json({ projects: user.projects });
    } catch (err) {
      const error = new HttpError('Updating projects failed, please try again later.', 500);
      return next(error);
    }
  };
  

  // Fetch user projects
const getProjects = async (req, res, next) => {
    const { email } = req.query;
  
    try {
      const user = await User.findOne({ email }, 'projects'); // Fetch only the projects field
      if (!user) {
        return next(new HttpError('User not found.', 404));
      }
      res.json({ projects: user.projects });
    } catch (err) {
      const error = new HttpError('Fetching projects failed, please try again later.', 500);
      return next(error);
    }
  };
  

// User Login
const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(new HttpError('User not found.', 404));
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return next(new HttpError('Invalid password.', 403));
        }

        res.json({ message: 'Logged in!', userId: user.id, email: user.email, projects: user.projects });
    } catch (err) {
        return next(new HttpError('Login failed, please try again later.', 500));
    }
};
// Delete users
const deleteUser = async (req, res, next) => {
    const { email, password } = req.body; // Extract email and password from the request body
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Verify the password
      const isPasswordValid = await user.comparePassword(password); // Assumes a comparePassword method is defined on the User model
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password.' });
      }
  
      // Delete the user
      await user.deleteOne();
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Deleting user failed, please try again later.' });
    }
  };
  

// --------------------------------------------------------------------- Unused Requests --------------------------------------------------------------------------------------------------------

// Get all users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password -__v -_id');
        res.json({ users: users.map(user => user.toObject({ getters: true })) });
    } catch (err) {
        const error = new HttpError('Fetching users failed, please try again later.', 500);
        return next(error);
    }
};

// Get users by first name
const getUsersByFirstName = async (req, res, next) => {
    const userFirstName = req.params.userFirstName;

    try {
        const users = await User.find({ userFirstName }, 'userFirstName userLastName email userId -_id');

        if (!users || users.length === 0) {
            return next(new HttpError("Could not find users with the given first name.", 404));
        }

        res.json({ users });
    } catch (err) {
        const error = new HttpError("Attempt unsuccessful. Please try again.", 500);
        return next(error);
    }
};

// Get users by last name
const getUsersByLastName = async (req, res, next) => {
    const userLastName = req.params.userLastName;

    try {
        const users = await User.find({ userLastName }, 'userFirstName userLastName email userId -_id');

        if (!users || users.length === 0) {
            return next(new HttpError("Could not find users with the given last name.", 404));
        }


        res.json({ users });
    } catch (err) {
        const error = new HttpError("Attempt unsuccessful. Please try again.", 500);
        return next(error);
    }
};


// Get a user by email
const getUserByEmail = async (req, res, next) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email }, '-password -__v -_id');

        if (!user) {
            return next(new HttpError("Could not find a user with the given email.", 404));
        }

        res.json({ user });
    } catch (err) {
        const error = new HttpError("Attempt unsuccessful. Please try again.", 500);
        return next(error);
    }
};



// Get user by Id
const getUsersByUserId = async (req, res, next) => {
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findOne({ userId }, '-password -__v -_id');
    } catch (err) {
        const error = new HttpError("Attempt unsuccessful. Please try again.", 500);
        return next(error);
    }

    if (!user) {
        return next(new HttpError("Could not find a user with the given ID.", 404));
    }

    res.json({ user });
};


// Update user info
const updateUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs, please check your info.', 422));
    }

    const userId = req.params.userId;
    const updates = req.body;

    delete updates.userId;

    try {
        const updatedUser = await User.findOneAndUpdate(
            { userId },
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return next(new HttpError('User not found.', 404));
        }

        res.status(200).json({ 
            user: {
                userFirstName: updatedUser.userFirstName,
                userLastName: updatedUser.userLastName,
                email: updatedUser.email,
                userId: updatedUser.userId
            }
        });
    } catch (err) {
        return next(new HttpError('Updating failed, please try again.', 500));
    }
};




exports.createUser = createUser;
exports.loginUser = loginUser;
exports.getAllUsers = getAllUsers;
exports.getUsersByFirstName = getUsersByFirstName;
exports.getUsersByLastName = getUsersByLastName;
exports.getUserByEmail = getUserByEmail;
exports.getUsersByUserId = getUsersByUserId;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.updateProjects = updateProjects;
exports.getProjects = getProjects;
