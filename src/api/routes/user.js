const {
  register,
  login,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/user');
const { isAdmin } = require('../../../middlewares/isAuth');

const usersRouter = require('express').Router();

usersRouter.get('/', [isAdmin], getUsers);
usersRouter.post('/register', register);
usersRouter.post('/login', login);
usersRouter.put('/:id', [isAdmin], updateUser);
usersRouter.delete('/:id', [isAdmin], deleteUser);

module.exports = usersRouter;
