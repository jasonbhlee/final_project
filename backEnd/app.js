const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const usersRoutes = require('./routes/users-routes');
const app = express();

// parses  incoming JSON data for the app
app.use(bodyParser.json());

// tests the route to see if the server is running
app.get('/', (req, res) => {
    res.json({ message: "API is running" });
});

// handles user-related routes
app.use("/api/users", usersRoutes);

// handles erros that occur in the app
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

// sets default error status to 500 if not provided
  res.status(error.code || 500); 
  res.json({ message: error.message || "An unknown error occurred!" });
});

// connects to MongoDB and starts the server
mongoose
  .connect(
    "mongodb+srv://kaimou:DKxtnxky9wqGpjaF@cluster0.oo1ir.mongodb.net/user?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });
