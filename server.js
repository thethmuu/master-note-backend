require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const todoLists = require("./routes/todoLists");
const userRoutes = require("./routes/user");
const faturePlans = require("./routes/faturePlan");
const noteBooks = require("./routes/noteBook");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/todolists", todoLists);
app.use("/api/fatureplans", faturePlans);
app.use("/api/notebooks", noteBooks);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
