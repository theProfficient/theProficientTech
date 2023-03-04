// // https://github.com/SeyCompLk/PitchEka-Backend/blob/main/models/match.js
// // https://github.com/SeyCompLk/PitchEka-Backend

const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const cricketModel = require("../model/cricketModel");

const createCric = async function (req, res) {
  try {
    // let cricMatch = req.query.hasOwnProperty("cricMatch") ? req.query.cricMatch : ""
    // let cricRuns = req.query.hasOwnProperty("cricRuns") ? req.query.cricRuns : ""
    // let cricWins = req.query.hasOwnProperty("cricWins") ? req.query.cricWins : ""

    let data = req.query;
    let UserId = req.query.UserId;
    let { cricMatch, cricRuns, cricWins } = data;
    // console.log(body,UserId);

    let getUserId = await userModel.findById({ _id: UserId });
    console.log(getUserId);

    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create cricketUser",
      });
    }

    let UserId1 = await cricketModel.findOne({ UserId: UserId });

    if (UserId1) {
      return res.status(400).send({
        status: false,
        message: "this userId is already registerd",
      });
    }

    const createCricTable = await cricketModel.create(data);
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
  try {
    let UserId = req.query.UserId;
    let cricket = await cricketModel.findOne({ UserId: UserId }); // find by useerId not A new created mongodb id

    if (!cricket) {
      return res
        .status(404)
        .send({ status: false, message: "this UserId not found" });
    }

    return res.status(200).send({
      status: true,
      message: "success",
      data: cricket,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

//__________update table

const updateCric = async function (req, res) {
  try {
    let updateData = req.query;
    let UserId = req.query.UserId;

    const matchData = await cricketModel.findOneAndUpdate(
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

//_____________get All data of cricket

const getAllCric = async function (req, res) {
  try {
    let data = req.query;

    const cricketData = await cricketModel.find(data).sort({ cricWins: -1 });

    if (data.length == 0) {
      return res
        .status(404)
        .send({ status: false, message: " no data is  found " });
    }
    return res.status(200).send({
      status: true,
      message: "Success",
      data: cricketData,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

module.exports = { createCric, getCric, updateCric, getAllCric };
