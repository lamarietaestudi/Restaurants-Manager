const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: [
      {
        type: String,
        required: true,
        enum: ['Barcelona', 'Tarragona', 'Girona', 'Lleida']
      }
    ],
    dishes: [
      {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'dishes'
      }
    ],
    verified: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, collection: 'restaurantsCollection' }
);

const Restaurant = mongoose.model(
  'restaurants',
  restaurantSchema,
  'restaurants'
); // model name , Schema name , collection name
module.exports = Restaurant;
