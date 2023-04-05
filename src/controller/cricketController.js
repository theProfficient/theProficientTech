const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const cricketModel = require("../model/cricketModel");
const groupModel = require("../model/groupModel");


// _____________get cricket group by id data

const getCricByGroupId = async function (req, res) {
  try {
    let groupId = req.query.groupId;

    let cricket = await groupModel.findById({ _id: groupId });
    if (!cricket) {
      return res
        .status(404)
        .send({ status: false, message: "this groupId not found" });
    }


    if (cricket.updatedPlayers.length !== 0) {
      let cricket1 = {
        _id: cricket._id,
        createdTime: cricket.createdTime,
        tableId: cricket.tableId,
        updatedPlayers: cricket.updatedPlayers,
        ball: cricket.ball,
        start: cricket.start,
        currentBallTime:cricket.currentBallTime,
        nextBallTime :cricket.nextBallTime,
        ballSpeed : cricket.ballSpeed

      };
      return res.status(200).send({
        status: true,
        message: "success",
        data: cricket1,
      });
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

//____________________________update table

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

//_______________________get All data of cricket

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
//__________________________________________update group's players data

const updateGroup = async function (req, res) {
  try {
    let groupId = req.query.groupId;
    let mathGroup = await groupModel.findById({ _id: groupId });
    let group = [...mathGroup.group[0]];

    let matchData;
    for (let i = 0; i < group.length; i++) {
      matchData = await groupModel.findOneAndUpdate(
        { _id: groupId },
       { $push: { updatedPlayers: { name: group[i], run:  0 } } },

        { new: true }
      );
    }
    if (matchData.length == 0) {
      return res.status(404).send({
        status: false,
        message: "user not found",
      });
    }
    let ballCount = matchData.ball;

    let max = 6;
    let continueRunning = true;
    let updateBall
    async function updateBalls() {
       updateBall = await groupModel.findByIdAndUpdate(
        { _id: groupId },
        { $inc: { ball: 1 } },
        { new: true }
      );
      ballCount = updateBall.ball;
      console.log(ballCount);

      if (ballCount >= max) {
        console.log("Reached maximum ball count!");
        continueRunning = false;
      }
    }

    function runUpdateBalls() {
      if (continueRunning) {
        updateBalls();
        setTimeout(runUpdateBalls, 4000);
      }
    }
    runUpdateBalls();
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

//_______________________________________update balls

// const updateBall = async function (req, res) {
//   try {
//     let groupId = req.query.groupId;

//     let balls = await groupModel.findById({ _id: groupId });
//     let ballCount = balls.ball;
//     let matchData;

//     let max = 6;
//     let continueRunning = true;

//     async function updateBalls() {
//       matchData = await groupModel.findByIdAndUpdate(
//         { _id: groupId },
//         { $inc: { ball: 1 } },
//         { new: true }
//       );
//       ballCount = matchData.ball;
//       console.log(ballCount);

//       if (ballCount >= max) {
//         console.log("Reached maximum ball count!");
//         continueRunning = false;
//       }
//     }

//     function runUpdateBalls() {
//       if (continueRunning) {
//         updateBalls();
//         setTimeout(runUpdateBalls, 4000);
//       }
//     }
//     runUpdateBalls();

//     return res.status(200).send({
//       status: true,
//       message: "Success",
//       data: matchData,
//     });
//   } catch (err) {
//     return res.status(500).send({
//       status: false,
//       error: err.message,
//     });
//   }
// };

module.exports = {
  updateCric,
  getAllCric,
  getCricByGroupId,
  updateGroup,
};
