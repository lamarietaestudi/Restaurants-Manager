const { isAdmin } = require('../../../middlewares/isAuth');
const Dishes = require('../models/dishes');

const getDishes = async (req, res, next) => {
  try {
    const dishes = await Dishes.find({ verified: true });
    return res.status(200).json(dishes);
  } catch (error) {
    return res.status(400).json({
      message: 'Error in Get Dishes controller',
      error: error.message
    });
  }
};

const getDishesToVerify = async (req, res, next) => {
  try {
    const dishes = await Dishes.find({ verified: false });
    return res.status(200).json(dishes);
  } catch (error) {
    return res.status(400).json({
      message: 'Error in Get Dishes to verify controller',
      error: error.message
    });
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
    return res
      .status(400)
      .json({ message: 'Error in Post Dish controller', error: error.message });
  }
};

const updateDish = async (req, res, next) => {
  try {
    const { id } = req.params;

    const oldDish = await Dishes.findById(id);
    if (!oldDish) {
      return res
        .status(404)
        .json({ message: 'Dish not found', error: error.message });
    }
    const dishUpdated = await Dishes.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(dishUpdated);
  } catch (error) {
    return res.status(400).json({
      message: 'Error in Update Dish controller',
      error: error.message
    });
  }
};

const deleteDish = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dishDeleted = await Dishes.findByIdAndDelete(id);
    return res.status(200).json(dishDeleted);
  } catch (error) {
    return res.status(400).json({
      message: 'Error in Delete Dish controller',
      error: error.message
    });
  }
};

module.exports = {
  getDishes,
  getDishesToVerify,
  postDish,
  updateDish,
  deleteDish
};
