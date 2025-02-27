const { verifyToken } = require('../utils/jwt');
const User = require('../src/api/models/user');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Invalid token or token not provided',
        error: error.message
      });
    }

    const parsedToken = token.replace('Bearer ', '');
    const { id } = verifyToken(parsedToken);

    const user = await User.findById(id);
    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Unauthorized', error: error.message });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (user.rol !== 'admin') {
      return res
        .status(400)
        .json({ message: 'Admin is required', error: error.message });
    }
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: 'Unauthorized', error: error.message });
  }
};

module.exports = { isAuth, isAdmin };
