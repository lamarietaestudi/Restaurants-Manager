const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Database connected');
  } catch (error) {
    console.log({ message: 'Database connection error', error: error.message });
  }
};

module.exports = { connectDB };
