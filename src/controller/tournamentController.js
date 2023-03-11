const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const tournamentModel = require("../model/tournamentModel")
const cricketModel = require("../model/cricketModel")

const createTournament = async function (req, res) {
  try {
    
    let {entryFee,prizeAmount,players,status} = req.query

    // const user = await userModel.findOne({ UserId: UserId });
   
        if (Object.keys(req.query).length == 0) {
          return res.status(400).send({
            status: false,
            message:
              "Body should  be not Empty please enter some data to create createTable",
          });
        }

    // const tournaments= await cricketModel.findOne({UserId: UserId })
    const tournamentTable1 = await tournamentModel.create( req.query)
    const tournamentTable2 = await tournamentModel.create( req.query)
    const tournamentTable3 = await tournamentModel.create( req.query)
    const tournamentTable4 = await tournamentModel.create( req.query)
    const tournamentTable5 = await tournamentModel.create( req.query)
        
    return res
    .status(201)
    .send({
      status: true,
      message: "Success",
      tournamentTable1,tournamentTable2,tournamentTable3,tournamentTable4,tournamentTable5
    });

  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

module.exports = { createTournament };