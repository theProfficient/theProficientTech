const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const hockyModel = require("../model/hockyModel");

const createHoc = async function (req, res) {
  try {
    // let hocMatch = req.query.hasOwnProperty("hocMatch") ? req.query.hocMatch : ""
    // let hocRuns = req.query.hasOwnProperty("hocRuns") ? req.query.hocRuns : ""
    // let hocWins = req.query.hasOwnProperty("hocWins") ? req.query.hocWins : ""

    let data = req.query;
    let UserId = req.query.UserId;
    let { hocMatch, hocRuns, HocWins } = data;

    let getUserId = await userModel.findById({ _id: UserId });
    console.log(getUserId);

    if (Object.keys(data).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create Hocuser",
      });
    }

    let UserId1 = await hockyModel.findOne({ UserId: UserId });

    if (UserId1) {
      return res.status(400).send({
        status: false,
        message: "this userId is already registerd",
      });
    }
    const createHocTable = await hockyModel.create(data);

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
    let UserId = req.query.UserId;
    let hocky = await hockyModel.findOne({ UserId: UserId }); // find by useerId not A new created mongodb id
    console.log(hocky);

    if (!hocky) {
      return res
        .status(404)
        .send({ status: false, message: "this UserId not found" });
    }

    return res.status(200).send({
      status: true,
      message: "success",
      data: hocky,
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
    let updateData = req.query;
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

    const HockyData = await hockyModel.find(data).sort({ HocWins: -1 });

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
