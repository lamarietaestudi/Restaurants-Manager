const { isAdmin } = require('../../../middlewares/isAuth');
const Dishes = require('../models/dishes');

const getDishes = async (req, res, next) => {
  try {
    const dishes = await Dishes.find({ verified: true });
    return res.status(200).json(dishes);
  } catch (error) {
    return res.status(400).json('Error in Get Dishes controller');
  }
};

const getDishesToVerify = async (req, res, next) => {
  try {
    const dishes = await Dishes.find({ verified: false });
    return res.status(200).json(dishes);
  } catch (error) {
    return res.status(400).json('Error in Get Dishes to verify controller');
  }
};

const postDish = async (req, res, next) => {
  try {
    const newDish = new Dishes(req.body);

    if (req.user.rol === 'admin') {
      newDish.verified = true;
    } else {
      newDish.verified = false;
    }

    const dishSaved = await newDish.save();
    return res.status(201).json(dishSaved);
  } catch (error) {
    return res.status(400).json('Error in Post Dish controller');
  }
};

const updateDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dishUpdated = await Dishes.findByIdAndUpdate(id, req.body, {
      new: true
    });
    return res.status(200).json(dishUpdated);
  } catch (error) {
    return res.status(400).json('Error in Update Dish controller');
  }
};

const deleteDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dishDeleted = await Dishes.findByIdAndDelete(id);
    return res.status(200).json(dishDeleted);
  } catch (error) {
    return res.status(400).json('Error in Delete Dish controller');
  }
};

module.exports = {
  getDishes,
  getDishesToVerify,
  postDish,
  updateDish,
  deleteDish
};
