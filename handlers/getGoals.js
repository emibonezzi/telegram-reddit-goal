const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = async function () {
  try {
    // connect to database
    await mongoose.connect(
      `mongodb+srv://admin:${process.env.MONGO_DB_PASS}@goals.qejb4s7.mongodb.net/?retryWrites=true&w=majority&appName=Goals`
    );
    // retrieve all goals
    const allGoals = await Goal.find();
    return allGoals;
  } catch (err) {
    console.log("Error in dealing with db...", err);
  } finally {
    // close db connection
    await mongoose.connection.close();
  }
};
