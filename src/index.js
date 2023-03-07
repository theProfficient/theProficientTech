const cors = require('cors');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./route/routes");


app.use("/", route);
//middleware
app.use(express.json());
app.use(cors());
app.options('*', cors())

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

// app.listen(process.env.PORT || 5000, function () {
//   console.log("Express app running on port" + (process.env.port || 5000));
// });

app.listen(5000, '0.0.0.0', function() {
  console.log('Listening to port:  ' + 5000);
});