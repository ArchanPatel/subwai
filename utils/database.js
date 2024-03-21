const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

const connectToDB = async () => {
  mongoose.set('strictQuery', true); 

  if(isConnected) {
      console.log('MongoDB is already connected');
      return;
    }
    try {
      console.log(`connecting to ${process.env.MONGODB_URI}`)
      await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "subwai_inventory",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
  
      isConnected = true;
  
      console.log('MongoDB connected')
    } catch (error) {
      console.log(error);
    }
}

module.exports = { connectToDB };