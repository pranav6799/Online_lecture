const mongoose = require("mongoose");

const DB = process.env.DATABASE_URL;

const connectDb = async () => {
  try {
    await mongoose.connect(DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB connected successfully");
  } catch (err) {
    err: err.message;
  }
};

module.exports = connectDb;
