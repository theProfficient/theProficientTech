const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const cricketModel = require("../model/cricketModel");
const groupModel = require("../model/groupModel");

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
 let ball = cricket.ball
 let isWicketUpdated = cricket.isWicketUpdated
 if(ball === 6 && isWicketUpdated === false){
  let updatedPlayers = cricket.updatedPlayers.map((player) => {
    if (!player.hit) {
      // If the player did not hit the ball, set the wicket to true
      player.wicket += 1;
    }
    if (player.hit) {
      // If the player did not hit the ball, set the wicket to true
      player.hit = false;
    }
    return player;
  });
  await groupModel.updateOne(
    { _id: groupId },
    { $set: { updatedPlayers, isWicketUpdated: true  } }
  );
 }
    if (cricket.updatedPlayers.length !== 0) {
      let cricket1 = {
        _id: cricket._id,
        createdTime: cricket.createdTime,
        tableId: cricket.tableId,
        updatedPlayers: cricket.updatedPlayers,
        ball: cricket.ball,
        start: cricket.start,
        currentBallTime: cricket.currentBallTime,
        nextBallTime: cricket.nextBallTime,
        ballSpeed: cricket.ballSpeed,
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
    let currentTime = Date.now();
    // find the document and update the run for the specified user

    const groupExist = await groupModel
      .findOne({ _id: groupId })
      .select({ group: 0 });

    if (!groupExist) {
      console.error("No matching document found");
      return res.status(404).send({
        status: false,
        message: "No matching document found",
        data: null,
      });
    }
    let group = groupExist.updatedPlayers;
    const user = group.find((user) => user.UserId.includes(UserId));
    let storedBallTime = groupExist.currentBallTime;
    let ballSpeed = groupExist.ballSpeed;
    let isWicketUpdated = groupExist.isWicketUpdated;
    let ball = groupExist.ball;

    console.log(storedBallTime, "time of ball");
    if (!user) {
      return res.status(404).send({
        status: true,
        message: "this user is not present in this group",
      });
    }
    const index = groupExist.updatedPlayers.findIndex(
      (player) => player.UserId === UserId
    );

    if (index === -1) {
      console.error("User not found in the updatedPlayers array");
      return res.status(404).send({
        status: false,
        message: "User not found in the updatedPlayers array",
        data: null,
      });
    }

    //______________________check the time diff and calculate run per player

    let timeDiff = Math.floor((currentTime - storedBallTime) / 100);
    console.log(timeDiff);

    let run = 0;

    switch (ballSpeed) {
      case 1:
        if (timeDiff >= 20) {
          run = 1;
        }
        break;
      case 2:
        if (timeDiff >= 18) {
          run = 2;
        }
        break;
      case 3:
        if (timeDiff >= 14) {
          run = 3;
        }
        break;
      case 4:
        if (timeDiff >= 10) {
          run = 4;
        }
        break;
      case 5:
        if (timeDiff >= 9) {
          run = 6;
        }
        break;
      case 6:
        if (timeDiff >= 8) {
          run = 6;
        }
        break;
      default:
        console.log("you just missed the ball");
    }

    groupExist.updatedPlayers[index].run += run;
    groupExist.updatedPlayers[index].hit = true;

    let updatedGroup = await groupExist.save();

    if(ball === 6 && isWicketUpdated === true){
      // let updatedPlayers = groupExist.updatedPlayers.map((player) => {
      //   if (!player.hit) {
      //     // If the player did not hit the ball, set the wicket to true
      //     player.wicket -= 1;
      //   }
      //   return player;
      // });
      // await groupModel.updateOne(
      //   { _id: groupId },
      //   { $set: { updatedPlayers, isWicketUpdated: false  } }

      // );
      groupExist.updatedPlayers[index].wicket -= 1;

       updatedGroup = await groupExist.save();
     }

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
};

module.exports = {
  updateCric,
  getAllCric,
  getCricByGroupId,
};
