const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });
