const express = require("express")
const userController = require("../controller/userController")

const Router = express.Router()



/*-----------------------------User Register----------------------------*/
Router.post("/register", userController.createUsers)

/*------------------------Get User Api's---------------------------------*/
Router.get("/profile", userController.getUser)

/*------------------------Update User Api's---------------------------------*/
// Router.put("/updateUser", userController.updateUser)

// Router.delete("/deleteUser", userController.deleteUser)



//************ checking your end point valid or not */
Router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports = Router