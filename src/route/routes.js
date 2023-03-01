const express = require("express")
const userController = require("../controller/userController")
const cricketController = require("../controller/cricketController")
const hockyController = require("../controller/hockyController");
const snakeLadderController = require("../controller/snakeLadderController");
const ticTacToe = require("../controller/ticTacToeController")

const Router = express.Router()



//_____________________________________User ______________

Router.post("/register", userController.createUsers)


Router.get("/profile", userController.getUser)


Router.put("/updateUser", userController.updateUser)

// Router.delete("/deleteUser", userController.deleteUser)



//_____________________ Cricket________________________

Router.post("/createCricket", cricketController.createCric)

Router.get("/cricketData", cricketController.getCric)

Router.put("/updateCricket", cricketController.updateCric)

// Router.delete("/deleteCricket", cricketController.deleteCric)













//************ checking your end point valid or not */
Router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports = Router