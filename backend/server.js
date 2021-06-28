const express = require("express");

const placesRouter = require("./routes/places-route");
const usersRouter = require("./routes/users-route");

const app = express();

const PORT = 5000;

app.use("/api/places", placesRouter);
app.use("/api/users", usersRouter);

// when we provide four parameters for the 'use' function, express interprets it as a Error Handler middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ msg: error.message || "an error accured" });
});

app.listen(process.env.PORT || PORT, (err) => {
  if (err) console.log(err);
  else console.log(`server started at "${PORT}"`);
});
