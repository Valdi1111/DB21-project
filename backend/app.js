require('dotenv').config();
const express = require('express');
const cors = require('cors');

const index = require('./routes/index_router');
const api = require('./routes/api_router');
const uploads = require('./routes/uploads_router');

// Setup app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add routes
app.use("/", index);
app.use("/api", api);
app.use("/uploads", uploads);

// Handling Errors
/*app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});*/

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  //console.error(err.message);
  console.error(err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(() => console.log('Server is running on port ' + app.get('port')));

module.exports = app;
