// imports
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const testRouter = require("./routes/test");
const user = require("./routes/user");
const ticket = require("./routes/ticket");
const route = require("./routes/route");
const complaint = require("./routes/complaint");

// initialization
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  next();
});

// Route
app.use("/test", testRouter);
app.use("/auth", user);
app.use("/user", user);
app.use("/route", route);
app.use("/ticketing", ticket);
app.use("/complaint", complaint);

// server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to DB and server running on port ${PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
