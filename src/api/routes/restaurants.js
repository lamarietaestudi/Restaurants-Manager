const {
  getRestaurants,
  postRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestToVerify,
  getDishesToVerify
} = require('../controllers/restaurants');

const { isAuth, isAdmin } = require('../../../middlewares/isAuth');

const restaurantsRouter = require('express').Router();

restaurantsRouter.get('/not-verified', [isAdmin], getRestToVerify);
restaurantsRouter.get('/', getRestaurants);
restaurantsRouter.post('/', [isAuth], postRestaurant);
restaurantsRouter.put('/:id', [isAuth], [isAdmin], updateRestaurant);
restaurantsRouter.delete('/:id', [isAuth], [isAdmin], deleteRestaurant);

module.exports = restaurantsRouter;
