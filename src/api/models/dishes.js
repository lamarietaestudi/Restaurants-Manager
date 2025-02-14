const mongoose = require('mongoose');

const dishesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    ingredients: { type: String, required: true, trim: true },
    allergies: [
      {
        type: String,
        required: true,
        enum: ['lactosa', 'gluten', 'frutos secos', 'huevos', 'mariscos']
      }
    ],
    verified: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, collection: 'dishesCollection' }
);

const Dishes = mongoose.model('dishes', dishesSchema, 'dishes'); // model name , Schema name , collection name
module.exports = Dishes;
