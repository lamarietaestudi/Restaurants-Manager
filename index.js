require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/db');
const usersRouter = require('./src/api/routes/user');
const dishesRouter = require('./src/api/routes/dishes');
const restaurantsRouter = require('./src/api/routes/restaurants');

const app = express();

app.use(express.json());
connectDB();

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/dishes', dishesRouter);
app.use('/api/v1/restaurants', restaurantsRouter);

app.use('/', (req, res, next) => {
  return res.status(200).json('Working successfully');
});

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});

app.listen(3000, () => {
  console.log('Server is running on port: http://localhost:3000');
});
