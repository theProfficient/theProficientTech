const express = require("express");

const userController = require("../controller/userController");
const cricketController = require("../controller/cricketController");
const hockyController = require("../controller/hockyController");
const snakeLadderController = require("../controller/snakeLadderController");
const ticTacToeController = require("../controller/ticTacToeController");
const balanceController = require("../controller/balanceController")
const tournamentController = require("../controller/tournamentController")
const Router = express.Router();

//_____________________________________User______________

Router.post("/register", userController.createUsers);

Router.get("/profile", userController.getUser);

Router.put("/updateUser", userController.updateUser);

//_____________________ Cricket________________________

// Router.post("/createCricket", cricketController.createCric);

// Router.get("/cricketData", cricketController.getCric);

Router.put("/updateCricket", cricketController.updateCric);

Router.get("/getAllCricketData", cricketController.getAllCric);

//__________________Hocky___________________

// Router.post("/createHocky", hockyController.createHoc);

// Router.get("/HockyData", hockyController.getHoc);

Router.put("/updateHocky", hockyController.updateHoc);

Router.get("/getAllHockyData", hockyController.getAllHoc);

//__________________snakeLadder___________________

// Router.post("/createSnakeLadder", snakeLadderController.createSnak);

// Router.get("/snakeLadderData", snakeLadderController.getSnak);

Router.put("/updateSnakeLadder", snakeLadderController.updateSnak);

Router.get("/getAllSnakeLadderData", snakeLadderController.getAllSnak);

//__________________ticTacToe___________________

// Router.post("/createTicTacToe", ticTacToe.createTic);

// Router.get("/ticTacToeData", ticTacToe.getTic);

Router.put("/updateTicTacToe", ticTacToeController.updateTic);

Router.get("/getAllTicTacToeData", ticTacToeController.getAllTic);

//************ checking your end point valid or not */


//_________________balance_____________________

Router.put("/updateBalance", balanceController.updateBalance);


//___________CreatetournamentsCricket_________

Router.post("/tournament1", tournamentController.createTournament1);
Router.post("/tournament2", tournamentController.createTournament2);
Router.post("/tournament3", tournamentController.createTournament3);
Router.post("/tournament4", tournamentController.createTournament4);
Router.post("/tournament5", tournamentController.createTournament5);

//___________ get All tournamentsCricket_________

Router.get("/tables", tournamentController.getAllTables);
//___updatetournamentsCricket__________

Router.put("/tournament", tournamentController.updateTournament);
// Router.put("/tournament2", tournamentController.updateTournament2);
// Router.put("/tournament3", tournamentController.updateTournament3);
// Router.put("/tournament4", tournamentController.updateTournament4);
// Router.put("/tournament5", tournamentController.updateTournament5);

Router.all("/**", function (req, res) {
  res.status(404).send({
    status: false,
    message: "Make Sure Your Endpoint is Correct or Not!",
  });
});

module.exports = Router;
