const express = require("express");

const userController = require("../controller/userController");
const cricketController = require("../controller/cricketController");
const hockyController = require("../controller/hockyController");
const snakeLadderController = require("../controller/snakeLadderController");
const ticTacToeController = require("../controller/ticTacToeController");
const balanceController = require("../controller/balanceController");
const tournamentController = require("../controller/tournamentController");
const Router = express.Router();

//_____________________________________User______________

Router.post("/register", userController.createUsers);

Router.get("/profile", userController.getUser);

Router.put("/updateUser", userController.updateUser);

//_____________________ Cricket________________________

Router.put("/updateCricket", cricketController.updateCric);

Router.get("/getAllCricketData", cricketController.getAllCric);

//__________________Hocky___________________

Router.put("/updateHocky", hockyController.updateHoc);

Router.get("/getAllHockyData", hockyController.getAllHoc);

//__________________snakeLadder___________________

Router.put("/updateSnakeLadder", snakeLadderController.updateSnak);

Router.get("/getAllSnakeLadderData", snakeLadderController.getAllSnak);

//__________________ticTacToe___________________

Router.put("/updateTicTacToe", ticTacToeController.updateTic);

Router.get("/getAllTicTacToeData", ticTacToeController.getAllTic);

//_________________credits_____________________

Router.put("/updateBalance", balanceController.updatecredits);

//___________tournaments_________

Router.post("/tournaments", tournamentController.createTournaments);

Router.get("/tables", tournamentController.getAllTables);

Router.put("/tournament", tournamentController.updateTournament);

Router.get("/groups", tournamentController.getGroups);

Router.get("/players", tournamentController.getPlayers);

//************ checking your end point valid or not */

Router.all("/**", function (req, res) {
  res.status(404).send({
    status: false,
    message: "Make Sure Your Endpoint is Correct or Not!",
  });
});

module.exports = Router;
