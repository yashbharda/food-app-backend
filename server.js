import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import testRoute from "./routes/test.route.js";
import connectDb from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import resturantRouter from "./routes/resturantRoute.js";
import categoryRouter from "./routes/categoryRoute.js";

// dotenv configuration
dotenv.config();

// DB Connection
connectDb();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

// route
app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/resturant", resturantRouter);
app.use("/api/v1/category", categoryRouter);

app.get("/", (req, res) => {
  return res.status(200).send("<h1> Welcome to server </h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.white.bgMagenta);
});
