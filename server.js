//import modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
require("dotenv").config();

//get express methods

const app = express();

//import mongodb url
const URL = process.env.MONGODB_URL;

//create server port

const PORT = process.env.PORT || 8070;

//use cors
app.use(cors());
//read json
app.use(bodyparser.json());

//access studentRoute file
const studentRouter = require("./routes/studentRoute.js");

app.use("/student", studentRouter);

//connect

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection success");
});

app.listen(PORT, () => {
  console.log(`Server is up and running in ${PORT}`);
});
