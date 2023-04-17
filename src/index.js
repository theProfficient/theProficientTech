const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./route/routes");

app.use(express.json());
app.use("/", route);

app.use(cors());
app.options("*", cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://theproficienttech333:gzYGYI5pD4oAUvim@cluster0.gp7jlnb.mongodb.net/game",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log("Not connected");
  });

app.listen(process.env.PORT || 8000, function () {
  console.log("Express app running on port" + (process.env.port || 8000));
});

