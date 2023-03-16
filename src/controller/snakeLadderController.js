const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const snakeLadderModel = require("../model/snakeLadderModel");

//___________update table

const updateSnak = async function (req, res) {
  try {
    let updateData = req.query;
    let UserId = req.query.UserId;

    const matchData = await snakeLadderModel.findOneAndUpdate(
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

//____________get All data of SnakeLadder

const getAllSnak = async function (req, res) {
  try {
    let data = req.query;

    const snakeLadderData = await snakeLadderModel
      .find(data)
      .sort({ snakWins: -1 });

    if (data.length == 0) {
      return res
        .status(404)
        .send({ status: false, message: " no data is  found " });
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: snakeLadderData,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

module.exports = { updateSnak, getAllSnak };
