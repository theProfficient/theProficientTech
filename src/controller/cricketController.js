const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const cricketModel = require("../model/cricketModel");
const groupModel = require("../model/groupModel")


const createCric = async function (req, res) {
  try {
 
    let data = req.query;
 
    let { cricMatch, cricRuns, cricWins, groupId, UserId} = data;
  
    // if (Object.keys(data).length == 0) {
    //   return res.status(400).send({
    //     status: false,
    //     message:
    //       "Body should  be not Empty please enter some data to create cricketUser",
    //   });
    // }

    // let groups = await groupModel.find()
    return res.status(201).send({
      status: true,
      message: " cricket table created successfully",
      data: groups,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

// _____________get cricket data

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

module.exports = { createCric,updateCric, getAllCric };
