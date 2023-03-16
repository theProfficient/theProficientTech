const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const ticTacToeModel = require("../model/ticTacToeModel");

//__________update Table

const updateTic = async function (req, res) {
  try {
    let updateData = req.query;
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

    const ticTacToeData = await ticTacToeModel.find(data).sort({ ticWins: -1 });

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

module.exports = { updateTic, getAllTic };
