const {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/user');
const { isAdmin, isAuth } = require('../../../middlewares/isAuth');

const usersRouter = require('express').Router();

usersRouter.get('/', [isAdmin], getUsers);
usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.put('/:id', [isAuth], updateUser); // [isAdmin] is redundant here
usersRouter.delete('/:id', [isAuth], deleteUser); // [isAdmin] is redundant here

module.exports = usersRouter;
