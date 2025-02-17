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
restaurantsRouter.post('/', [isAuth], postRestaurant); // [isAdmin] is redundant here
restaurantsRouter.put('/:id', [isAdmin], updateRestaurant);
restaurantsRouter.delete('/:id', [isAdmin], deleteRestaurant);

module.exports = restaurantsRouter;
