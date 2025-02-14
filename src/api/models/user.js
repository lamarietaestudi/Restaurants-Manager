const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    rol: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user'
    },
    location: { type: String, required: true, trim: true },
    allergies: [
      {
        type: String,
        required: true,
        enum: [
          'sin alergias',
          'lactosa',
          'gluten',
          'frutos secos',
          'huevos',
          'mariscos'
        ]
      }
    ]
  },
  { timestamps: true, collection: 'usersCollection' }
);

userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model('users', userSchema, 'users'); // model name , Schema name , collection name
module.exports = User;
