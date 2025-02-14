const { verifyToken } = require('../utils/jwt');
const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
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
