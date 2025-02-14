const { generateToken } = require('../../../utils/jwt');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json('Error in Get Users');
  }
};

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      rol: 'user',
      location: req.body.location,
      allergies: req.body.allergies
    });

    const userDuplicated = await User.findOne({ username: req.body.username });
    if (userDuplicated) {
      return res.status(400).json('This user already exists.');
    }
    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);
  } catch (error) {
    return res.status(400).json('Register error');
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json("Can't find user.");
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateToken(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json('Password incorrect.');
    }
  } catch (error) {
    return res.status(400).json('Login error');
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true
    });
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(400).json('Error in Update User');
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndDelete(id);
    return res.status(200).json(userDeleted);
  } catch (error) {
    return res.status(400).json('Error in Delete User');
  }
};

module.exports = { register, login, getUsers, updateUser, deleteUser };
