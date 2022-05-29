const express = require('express');
const cors = require('cors');
require('dotenv').config();

const index = require('./routes/index_router');
const api = require('./routes/api_router');
const uploads = require('./routes/uploads_router');

// Setup app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Add routes
app.use("/", index);
app.use("/api", api);
app.use("/uploads", uploads);

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.listen(() => console.log('Server is running on port ' + app.get('port')));

module.exports = app;
