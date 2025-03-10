const Restaurant = require('../models/restaurants');

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({ verified: true });
    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(400).json({
      message: 'Error in Get restaurants controller',
      error: error.message
    });
  }
};

const getRestToVerify = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({ verified: false });
    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(400).json({
      message: 'Error in Get restaurants to verify controller',
      error: error.message
    });
  }
};

const postRestaurant = async (req, res, next) => {
  try {
    const newRestaurant = new Restaurant(req.body);

    if (req.user.rol === 'admin') {
      newRestaurant.verified = true;
    } else {
      newRestaurant.verified = false;
    }

    const restaurantSaved = await newRestaurant.save();
    return res.status(201).json(restaurantSaved);
  } catch (error) {
    return res.status(400).json({
      message: 'Error in Post restaurants controller',
      error: error.message
    });
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldRestaurant = await Restaurant.findById(id);
    if (!oldRestaurant) {
      return res
        .status(404)
        .json({ message: 'Restaurant not found', error: error.message });
    }

    let updatedDishes = oldRestaurant.dishes.map((dish) => dish.toString());

    if (req.body.dishes && Array.isArray(req.body.dishes)) {
      req.body.dishes.forEach((dishId) => {
        if (!updatedDishes.includes(dishId)) {
          updatedDishes.push(dishId);
        }
      });
    }

    const restaurantUpdated = await Restaurant.findByIdAndUpdate(
      id,
      { $set: { dishes: updatedDishes, ...req.body } },
      { new: true }
    ).populate('dishes');
    return res.status(200).json(restaurantUpdated);
  } catch (error) {
    return res.status(400).json({
      message: 'Error in Update restaurants controller',
      error: error.message
    });
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurantDeleted = await Restaurant.findByIdAndDelete(id);
    return res.status(200).json(restaurantDeleted);
  } catch (error) {
    return res.status(400).json({
      message: 'Error in Delete restaurants controller',
      error: error.message
    });
  }
};

module.exports = {
  getRestaurants,
  getRestToVerify,
  postRestaurant,
  updateRestaurant,
  deleteRestaurant
};
