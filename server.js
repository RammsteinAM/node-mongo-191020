const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const todoRoutes = require("./routes/todo.route");
const errorHandlerMiddleware = require("./utils/errorHandleMiddleware");
dotenv.config({ path: "./config/.env"});

const app = express();
connectDb();

app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, console.log('Server is running on port ', process.env.PORT));
