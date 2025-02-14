const Restaurant = require('../models/restaurants');

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({ verified: true });
    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(400).json('Error in Get restaurants controller');
  }
};

const getRestToVerify = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({ verified: false });
    return res.status(200).json(restaurants);
  } catch (error) {
    return res
      .status(400)
      .json('Error in Get restaurants to verify controller');
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
    return res.status(400).json('Error in Post restaurants controller');
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurantUpdated = await Restaurant.findByIdAndUpdate(id, req.body, {
      new: true
    });
    return res.status(200).json(restaurantUpdated);
  } catch (error) {
    return res.status(400).json('Error in Update restaurants controller');
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurantDeleted = await Restaurant.findByIdAndDelete(id);
    return res.status(200).json(restaurantDeleted);
  } catch (error) {
    return res.status(400).json('Error in Delete restaurants controller');
  }
};

module.exports = {
  getRestaurants,
  getRestToVerify,
  postRestaurant,
  updateRestaurant,
  deleteRestaurant
};
