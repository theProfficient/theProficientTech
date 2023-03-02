const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const hockyModel = require("../model/hockyModel");

const createHoc = async function (req, res) {
  try {

      // let hocMatch = req.query.hasOwnProperty("cricMatch") ? req.query.cricMatch : ""
    // let hocRuns = req.query.hasOwnProperty("cricRuns") ? req.query.cricRuns : ""
    // let hocWins = req.query.hasOwnProperty("cricWins") ? req.query.cricWins : ""
   
    let body = req.body;
    let UserIdForHoc = UserId.UserId_id;
    UserId = await userModel.findById({ UserId: UserIdForHoc });

if (Object.keys(body).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create Hocuser",
      });
    }

    const createHocTable = await hockyModel.create(body);

    return res.status(201).send({
      status: true,
      message: " Hocky table created successfully",
      data: createHocTable,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

//________________get Hocky Data

const getHoc = async function (req, res) {
  try {
    let UserId1 = req.query.UserId1;
    let Hocky = await hockyModel.findOne({ UserId: UserId1 }); // find by useerId not A new created mongodb id

    if (!Hocky) {
      return res
        .status(404)
        .send({ status: false, message: "this UserId not found" });
    }

    return res.status(200).send({
      status: true,
      message: "success",
      data: Hocky,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

//_________update Table

const updateHoc = async function (req, res) {
  try {
    let updateData = req.body;
    let UserId = req.query.UserId;

    const matchData = await hockyModel.findOneAndUpdate(
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

//_______________GET all Data of hocky


const getAllHoc = async function (req, res) {
  try {
    let data = req.query;

    const HockyData = await hockyModel
      .find(data)
      .sort({ hocMatch: -1, hocRuns: -1, HocWins: -1 });

    if (data.length == 0) {
      return res
        .status(404)
        .send({ status: false, message: " no data is found " });
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: HockyData,
    });
    
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

module.exports = { createHoc, getHoc, updateHoc, getAllHoc };
