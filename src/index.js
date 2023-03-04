/** @format */

const express = require("express");
const app = express();
const mongoose = require("mongoose");
//middleware
app.use(express.json());

const route = require("./route/routes");
app.use("/", route);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://nikita1:7CSKh9nBmgBm27YC@cluster0.suzof1p.mongodb.net/proficientTech",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log("no connected");
  });

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port" + (process.env.port || 3000));
});
