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
    let groupId = req.query.groupId;

   // find the document and update the run for the specified user

  const updateRun = await groupModel.findOne({ _id: groupId }).select({group:0});

  if (!updateRun) {
    console.error('No matching document found');
    return res.status(404).send({
      status: false,
      message: "No matching document found",
      data: null,
    });
  }
  let group =updateRun.updatedPlayers
  const user = group.find((user) => user.UserId.includes(UserId));

  if(!user){
    return res.status(404).send({
      status: true,
      message: "this user is not present in this group"
      })
    }
  const index = updateRun.updatedPlayers.findIndex((player) => player.UserId === UserId);

  if (index === -1) {
    console.error('User not found in the updatedPlayers array');
    return res.status(404).send({
      status: false,
      message: "User not found in the updatedPlayers array",
      data: null,
    });
  }

  updateRun.updatedPlayers[index].run += 4;
  updateRun.updatedPlayers[index].hit = true;

  const updatedGroup = await updateRun.save();

  return res.status(200).send({
    status: true,
    message: "Success",
    data: updatedGroup,
  });
} catch (err) {
  return res.status(500).send({
    status: false,
    error: err.message,
  });
}
  }
//_______________________get All data of cricket for leaderBoard

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

module.exports = {
  updateCric,
  getAllCric,
  getCricByGroupId
};
