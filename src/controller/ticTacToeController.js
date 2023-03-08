const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const ticTacToeModel = require("../model/ticTacToeModel");

// const createTic = async function (req, res) {
//   try {
//     // let ticMatch = req.query.hasOwnProperty("ticMatch") ? req.query.ticMatch : ""
//     // let ticRuns = req.query.hasOwnProperty("ticRuns") ? req.query.ticRuns : ""
//     // let ticWins = req.query.hasOwnProperty("ticWins") ? req.query.ticWins : ""

//     let data = req.query;
//     let UserId = req.query.UserId;
//     let { ticMatch, ticRuns, ticWins } = data;
//     console.log(data, UserId);

//     let getUserId = await userModel.findById({ _id: UserId });
//     console.log(getUserId);

//     if (Object.keys(data).length == 0) {
//       return res.status(400).send({
//         status: false,
//         message:
//           "Body should  be not Empty please enter some data to create ticTacToeUser",
//       });
//     }

//     let UserId1 = await ticTacToeModel.findOne({ UserId: UserId });

//     if (UserId1) {
//       return res.status(400).send({
//         status: false,
//         message: "this userId is already registerd",
//       });
//     }

//     const createTicTable = await ticTacToeModel.create(data);
//     return res.status(201).send({
//       status: true,
//       message: " ticTacToe table created successfully",
//       data: createTicTable,
//     });
//   } catch (error) {
//     return res.status(500).send({
//       status: false,
//       message: error.message,
//     });
//   }
// };

//__________get ticTacToe Table

const getTic = async function (req, res) {
  try {
    let UserId = req.query.UserId;
    let ticTacToe = await ticTacToeModel.findOne({ UserId: UserId });

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

module.exports = { getTic, updateTic, getAllTic };
