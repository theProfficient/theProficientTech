// // https://github.com/SeyCompLk/PitchEka-Backend/blob/main/models/match.js
// // https://github.com/SeyCompLk/PitchEka-Backend

const mongoose = require("mongoose");
const cricketModel = require("../model/cricketModel");

const createCric = async function (req, res) {
  try {
    // let cricMatch = req.query.hasOwnProperty("cricMatch") ? req.query.cricMatch : ""
    // let cricRuns = req.query.hasOwnProperty("cricRuns") ? req.query.cricRuns : ""
    // let cricWins = req.query.hasOwnProperty("cricWins") ? req.query.cricWins : ""

    let body = req.body;

    let { cricMatch, cricRuns, cricWins } = body;

    if (Object.keys(body).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create user",
      });
    }

    const createCricTable = await cricketModel.create(body);

    return res.status(201).send({
      status: true,
      message: " cricket table created successfully",
      data: createCricTable,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};



//_____________get cricket data

const getCric = async function (req, res) {

try{
 
  let data = req.query.UserId;

  let cricket = await cricketModel.findOne({ UserId : data})

   if(!cricket){
    return res.status(404).send({ status: false, message: "this userId not found" })
   }

   if(cricket.UserId != UserId) {
    return res.status(400).send({ status: false, message: "with this userId cricket does not exist" })
  }
   

  return res.status(200).send({
    status:true,
    message:'success',
    data:cricket
  })

}catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
}

//__________update table

const  updateCric = async function (req,res){
  try{
    let  updateData = req.body;
    let UserId = req.query.UserId;

    const matchData = await cricketModel.findOneAndUpdate(
      {cricMatch:cricMatch}, {cricRuns:cricRuns}, {cricWins:cricWins} , updateData , {new:true}
    );

    if (matchData .length == 0 ){
      return res.status(404).send({
        status :false,
        message: "user not found",
})
    }

   return res.status(200).send({
    status: true,
    message: "Success",
    data: user,
  });
} catch (err) {
  return res.status(500).send({
    status: false,
    error: err.message,
  });
}
};




module.exports = { createCric,getCric,updateCric };
