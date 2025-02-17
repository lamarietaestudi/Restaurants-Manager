const { verifyToken } = require('../utils/jwt');
const User = require('../src/api/models/user');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json('Invalid token or token not provided');
    }

    const parsedToken = token.replace('Bearer ', '');
    const { id } = verifyToken(parsedToken);

    const user = await User.findById(id);
    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json('Unauthorized');
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json('Invalid token or token not provided');
    }
    const parsedToken = token.replace('Bearer ', '');

    const { id } = verifyToken(parsedToken);
    const user = await User.findById(id);

    if (user.rol !== 'admin') {
      return res.status(400).json('Admin is required');
    } else {
      user.password = null;
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(401).json('Unauthorized');
  }
};

module.exports = { isAuth, isAdmin };
