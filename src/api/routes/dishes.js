const {
  getDishes,
  getDishesToVerify,
  postDish,
  updateDish,
  deleteDish
} = require('../controllers/dishes');
const { isAuth, isAdmin } = require('../../../middlewares/isAuth');

const dishesRouter = require('express').Router();

dishesRouter.get('/not-verified', [isAdmin], getDishesToVerify);
dishesRouter.get('/', getDishes);
dishesRouter.post('/', [isAuth], postDish);
dishesRouter.put('/:id', [isAuth], [isAdmin], updateDish);
dishesRouter.delete('/:id', [isAuth], [isAdmin], deleteDish);

module.exports = dishesRouter;
