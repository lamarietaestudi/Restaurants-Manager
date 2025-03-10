const { generateToken } = require('../../../utils/jwt');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error in Get Users', error: error.message });
  }
};

const register = async (req, res, next) => {
  const userDuplicated = await User.findOne({ username: req.body.username });
  if (userDuplicated) {
    return res
      .status(400)
      .json({ message: 'This user already exists.', error: error.message });
  }
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      rol: 'user',
      location: req.body.location,
      allergies: req.body.allergies
    });

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Register error', error: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Can't find user.", error: error.message });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res
        .status(400)
        .json({ message: 'Password incorrect.', error: error.message });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Login error', error: error.message });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldUser = await User.findById(id);
    if (!oldUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (req.user.rol !== 'admin' && req.user._id.toString() !== id) {
      return res.status(403).json({ message: 'Unauthorized operation.' });
    }

    let updatedRelatedUsers = oldUser.relatedUsers.map((user) =>
      user.toString()
    );

    if (
      req.body.relatedUsers &&
      Array.isArray(req.body.relatedUsers) &&
      req.body.relatedUsers.length > 0
    ) {
      req.body.relatedUsers.forEach((userId) => {
        if (!updatedRelatedUsers.includes(userId)) {
          updatedRelatedUsers.push(userId);
        }
      });
    }

    const userUpdated = await User.findByIdAndUpdate(
      id,
      { $set: { relatedUsers: updatedRelatedUsers } },
      { new: true }
    );

    return res.status(200).json(userUpdated);
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error in Update User', error: error.message });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.rol !== 'admin' && req.user._id.toString() !== id) {
      return res
        .status(403)
        .json({ message: 'Unauthorized operation.', error: error.message });
    } else {
      const userDeleted = await User.findByIdAndDelete(id);
      return res.status(200).json(userDeleted);
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error in Delete User', error: error.message });
  }
};

module.exports = { register, login, getUsers, updateUser, deleteUser };
