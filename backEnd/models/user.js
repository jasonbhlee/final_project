const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userFirstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  projects: { type: [String], default: [] },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
