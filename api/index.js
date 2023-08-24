const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://JeffSia:hJ4YkeMI521zjtfH@viennaapp.beqbheu.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to Mongo Db");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

// Import and use the user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log("Server running on port 8000");
});
