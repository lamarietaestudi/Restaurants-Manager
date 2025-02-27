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
<<<<<<< HEAD
  } catch (error) {
=======

 } catch (error) {
>>>>>>> 61441364967c4155d338feafde3fbf164f4a4bf0
    console.log('Dishes Seed Error');
  } finally {
    await mongoose.disconnect();
  }
};

initDishesSeed();
