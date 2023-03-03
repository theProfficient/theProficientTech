const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const ticTacToeModel = require("../model/ticTacToeModel");

const createTic = async function (req, res) {
  try {
    // let ticMatch = req.query.hasOwnProperty("ticMatch") ? req.query.ticMatch : ""
    // let ticRuns = req.query.hasOwnProperty("ticRuns") ? req.query.ticRuns : ""
    // let ticWins = req.query.hasOwnProperty("ticWins") ? req.query.ticWins : ""

    let body = req.body;
    let UserId = req.query;
    let { ticMatch, ticRuns, ticWins } = data;
    console.log(body,UserId);

     let getUserId = await userModel.findById({_id:UserId})
     console.log(getUserId);

    if (Object.keys(body).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create ticTacToeUser",
      });
    }

    const createTicTable = await ticTacToeModel.create(body);

    return res.status(201).send({
      status: true,
      message: " ticTacToe table created successfully",
      data: createTicTable,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

//__________get ticTacToe Table

const getTic = async function (req, res) {
  try {
    let UserId1 = req.query.UserId1;

    let ticTacToe = await ticTacToeModel.findOne({ UserId: UserId1 });

    if (!ticTacToe) {
      return res
        .status(404)
        .send({ status: false, message: "this UserId not found" });
    }

    return res.status(200).send({
      status: true,
      message: "success",
      data: ticTacToe,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

//__________update Table

const updateTic = async function (req, res) {
  try {
    let updateData = req.body;
    let UserId = req.query.UserId;

    const matchData = await ticTacToeModel.findOneAndUpdate(
      { UserId: UserId },
      updateData,
      { new: true }
    );

    if (matchData.length == 0) {
      return res.status(404).send({
        status: false,
        message: "user not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: matchData,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

//___________get All data of TicTacToeData

const getAllTic = async function (req, res) {
  try {
    let data = req.query;

    const ticTacToeData = await ticTacToeModel
      .find(data)
      .sort({ ticMatch: -1, ticRuns: -1, ticRuns: -1 });

    if (data.length == 0) {
      return res
        .status(404)
        .send({ status: false, message: " no data is  found " });
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: ticTacToeData,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

module.exports = { createTic, getTic, updateTic, getAllTic };
