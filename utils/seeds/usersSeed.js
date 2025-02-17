const mongoose = require('mongoose');
const User = require('../../src/api/models/user');
const users = require('../../src/data/usersData');
const bcrypt = require('bcrypt');

const initUsersSeed = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://maria_sola:lW2Rb3oyEBghHFr3@cluster0.tpiq1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );

    await User.collection.drop();

    const encryptPasswords = users.map((user) => {
      user.password = bcrypt.hashSync(user.password, 10);
      user.rol = 'user';
      return user;
    });

    await User.insertMany(encryptPasswords);

    await mongoose.disconnect();
  } catch (error) {
    console.log('Users Seed Error');
  }
};

initUsersSeed();
