const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://huzaifa:123454321@cluster0.p9rgdoa.mongodb.net/",

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`mongodb connect Successfully on ${conn.connection.host}`);
  } catch (err) {
    console.log(`db error ${err}`);
    process.exit();
  }
};

module.exports = connectDB;
