const express = require("express");
const mongoose = require("mongoose");

const placesRouter = require("./routes/places-route");
const usersRouter = require("./routes/users-route");
const HttpError = require("./models/http-error");

const app = express();
const PORT = 5000;
const DB_USER = "geogalleryadmin";
const DB_PASSWORD = encodeURIComponent("Miki@12345");
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.phuqt.mongodb.net/galleryDB?retryWrites=true&w=majority`;

// app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json());

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  
  next();
});

app.use("/api/places", placesRouter);
app.use("/api/users", usersRouter);

app.use((req, res, next) => {
  throw new HttpError("Page not found.", 404);
});

// when we provide four parameters for the 'use' function,
// express interprets it as an Error Handler middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ msg: error.message || "an error accured" });
});

// database
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log(`connecting to database was successfully!`);
    // if connection to the db was ok then
    app.listen(process.env.PORT || PORT, (err) => {
      if (err) console.log(err);
      else console.log(`server started at "${PORT}"`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
