import mongoose from "mongoose";
import colors from "colors";

// function mongodb database connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To Database ${mongoose.connection.host}`.bgCyan);
  } catch (error) {
    console.log(`DB Error: ${error.message}`.bgRed);
    throw error;
  }
};

export default connectDb;
