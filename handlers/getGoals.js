const mongoose = require("mongoose");
require("dotenv").config();
const goalSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = async function () {
  try {
    // connect to database
    await mongoose.connect(
      `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@goals.qejb4s7.mongodb.net/?retryWrites=true&w=majority&appName=Goals?keepAlive=true`
    );
    // retrieve all goals
    const allGoals = await Goal.find();
    await mongoose.disconnect();
    return allGoals;
  } catch (err) {
    console.log("Error in dealing with db...", err);
    throw err;
  }
};
