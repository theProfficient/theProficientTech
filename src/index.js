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
    "mongodb+srv://nikita1:7CSKh9nBmgBm27YC@cluster0.suzof1p.mongodb.net/gammingWebBased",
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

