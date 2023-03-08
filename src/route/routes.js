const express = require("express");

const userController = require("../controller/userController");
const cricketController = require("../controller/cricketController");
const hockyController = require("../controller/hockyController");
const snakeLadderController = require("../controller/snakeLadderController");
const ticTacToe = require("../controller/ticTacToeController");

const Router = express.Router();

//_____________________________________User ______________

Router.post("/register", userController.createUsers);

Router.get("/profile", userController.getUser);

Router.put("/updateUser", userController.updateUser);

//_____________________ Cricket________________________

// Router.post("/createCricket", cricketController.createCric);

Router.get("/cricketData", cricketController.getCric);

Router.put("/updateCricket", cricketController.updateCric);

Router.get("/getAllCricketData", cricketController.getAllCric);

//__________________Hocky___________________

// Router.post("/createHocky", hockyController.createHoc);

Router.get("/HockyData", hockyController.getHoc);

Router.put("/updateHocky", hockyController.updateHoc);

Router.get("/getAllHockyData", hockyController.getAllHoc);

//__________________snakeLadder___________________

// Router.post("/createSnakeLadder", snakeLadderController.createSnak);

Router.get("/snakeLadderData", snakeLadderController.getSnak);

Router.put("/updateSnakeLadder", snakeLadderController.updateSnak);

Router.get("/getAllSnakeLadderData", snakeLadderController.getAllSnak);

//__________________ticTacToe___________________

// Router.post("/createTicTacToe", ticTacToe.createTic);

Router.get("/ticTacToeData", ticTacToe.getTic);

Router.put("/updateTicTacToe", ticTacToe.updateTic);

Router.get("/getAllTicTacToeData", ticTacToe.getAllTic);

//************ checking your end point valid or not */

Router.all("/**", function (req, res) {
  res.status(404).send({
    status: false,
    message: "Make Sure Your Endpoint is Correct or Not!",
  });
});

module.exports = Router;
