const axios = require("axios");
const getGoals = require("./handlers/getGoals");

exports.handler = async (event, context) => {
  try {
    // Parse the event body
    const body = JSON.parse(event.body);
    console.log("Parsed body:", body);

    // Retrieve from db list of goals
    const goals = await getGoals();

    console.log(goals);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "success",
      }),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
    };
  }
};
