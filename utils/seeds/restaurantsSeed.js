const mongoose = require('mongoose');
const Restaurant = require('../../src/api/models/restaurants');
const restaurants = require('../../src/data/restaurantsData');

const initRestaurantsSeed = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://maria_sola:lW2Rb3oyEBghHFr3@cluster0.tpiq1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );

    await Restaurant.collection.drop();
    await Restaurant.insertMany(restaurants);
<<<<<<< HEAD
=======

>>>>>>> 61441364967c4155d338feafde3fbf164f4a4bf0
  } catch (error) {
    console.log('Restaurants Seed Error');
  } finally {
    await mongoose.disconnect();
  }
};

initRestaurantsSeed();
