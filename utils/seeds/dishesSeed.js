const mongoose = require('mongoose');
const Dishes = require('../../src/api/models/dishes');
const dishes = require('../../src/data/dishesData');

const initDishesSeed = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://maria_sola:lW2Rb3oyEBghHFr3@cluster0.tpiq1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );

    await Dishes.collection.drop();
    await Dishes.insertMany(dishes);
  } catch (error) {
    console.log('Dishes Seed Error');
  } finally {
    await mongoose.disconnect();
  }
};

initDishesSeed();
