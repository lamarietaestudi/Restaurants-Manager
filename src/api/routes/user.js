const {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/user');
const { isAdmin, isAuth } = require('../../../middlewares/isAuth');

const usersRouter = require('express').Router();

usersRouter.get('/', [isAuth], [isAdmin], getUsers);
usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.put('/:id', [isAuth], [isAdmin], updateUser);
usersRouter.delete('/:id', [isAuth], [isAdmin], deleteUser);

module.exports = usersRouter;
