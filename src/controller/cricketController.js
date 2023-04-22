const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const cricketModel = require("../model/cricketModel");
const groupModel = require("../model/groupModel");
const { getPlayers } = require("./tournamentController");
const { log } = require("console");

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
    console.log("before run update>>>>>>>>>>>", cricket.updatedPlayers);
    console.log("time before run update>>>>>>>>>>>", new Date().getSeconds());
    setTimeout(async () => {
      const updateRunForBot = cricket.updatedPlayers.map((botPlayers) => {
        if (botPlayers.isBot === true && !botPlayers.hit) {
          // Determine if the bot player should be out
          if (botPlayers.run > 1 && Math.random() > 0.5) {
            botPlayers.wicket += 1;
            botPlayers.run += 0;
            botPlayers.hit = true;
          } else {
            const possibleValues = [1, 2, 3, 4, 6];

            const randomIndex = Math.floor(
              Math.random() * possibleValues.length
            );

            const randomValue = possibleValues[randomIndex];
            botPlayers.run += randomValue;
            botPlayers.hit = true;
          }
        }
        return botPlayers;
      });

      const updatedRunForBotPlayers = await groupModel.findOneAndUpdate(
        { _id: groupId },
        { $set: { updatedPlayers: updateRunForBot} },
        { new: true } // Return the updated document instead of the original document
      );
    
      console.log("after run update>>>>>>>>>>>", updatedRunForBotPlayers.updatedPlayers);
      console.log("time after run update>>>>>>>>>>>", new Date().getSeconds());
    }, 2000);

    let ball = cricket.ball;
    let isWicketUpdated = cricket.isWicketUpdated;
    if (ball === 0 && isWicketUpdated === false) {
      let updatedPlayers = cricket.updatedPlayers.map((player) => {
        if (!player.hit && !player.isBot) {
          // If the player did not hit the ball, set the wicket to true
          player.wicket += 1;
          
        }
        // if (player.hit) {
        //   // If the player did not hit the ball, set the wicket to true
        //   player.hit = false;
        // }
        return player;
      });
      await groupModel.updateOne(
        { _id: groupId },
        { $set: { updatedPlayers, isWicketUpdated: true } }
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
      return res.status(200).json(cricket1);
    }

    return res.status(200).json(cricket);
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

//____________________________update table__________________________

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
    if (!user) {
      return res.status(404).send({
        status: true,
        message: "this user is not present in this group",
      });
    }
    let storedBallTime = groupExist.currentBallTime;
    let ballSpeed = groupExist.ballSpeed;
    let isWicketUpdated = groupExist.isWicketUpdated;
    let ball = groupExist.ball;

    console.log(storedBallTime, "time of ball");

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
    let isRunUpdated = groupExist.updatedPlayers[index].isRunUpdated;
    let updatedRun = groupExist.updatedPlayers[index].run;
    let timeDiff = Math.floor((currentTime - storedBallTime) / 100);

    console.log("isRunUpdated>>>>>>>>>>>>>>", isRunUpdated);
    console.log("timeDiff>>>>>>>>>>>>>>>>>>>", timeDiff);
    console.log("ballSpeed++++++++++++++++++", ballSpeed);
    console.log("updatedRun>>>>>>>>>>>>>>>>>>", updatedRun);

    if (isRunUpdated === false) {
      let currentRun = 0;

      switch (ballSpeed) {
        case 11:
        case 12:
          if (timeDiff >= 20) {
            currentRun = 4;
          } else if (timeDiff >= 18) {
            currentRun = 2;
          } else if (timeDiff >= 14) {
            currentRun = 3;
          } else if (timeDiff >= 10) {
            currentRun = 1;
          } else if (timeDiff >= 1) {
            currentRun = 6;
          } else {
            console.log("You just missed the ball");
          }
          break;
        case 13:
        case 14:
          if (timeDiff >= 20) {
            currentRun = 3;
          } else if (timeDiff >= 18) {
            currentRun = 1;
          } else if (timeDiff >= 14) {
            currentRun = 6;
          } else if (timeDiff >= 10) {
            currentRun = 4;
          } else if (timeDiff >= 1) {
            currentRun = 2;
          } else {
            console.log("You just missed the ball");
          }
          break;
        case 15:
        case 16:
          if (timeDiff >= 20) {
            currentRun = 6;
          } else if (timeDiff >= 18) {
            currentRun = 4;
          } else if (timeDiff >= 14) {
            currentRun = 3;
          } else if (timeDiff >= 10) {
            currentRun = 2;
          } else if (timeDiff >= 1) {
            currentRun = 1;
          } else {
            console.log("You just missed the ball");
          }
          break;
        case 17:
        case 18:
          if (timeDiff >= 20) {
            currentRun = 1;
          } else if (timeDiff >= 18) {
            currentRun = 2;
          } else if (timeDiff >= 14) {
            currentRun = 3;
          } else if (timeDiff >= 10) {
            currentRun = 4;
          } else if (timeDiff >= 1) {
            currentRun = 6;
          } else {
            console.log("You just missed the ball");
          }
          break;

        default:
          console.log("Invalid ball speed");
          return res.status(404).send({
            status: false,
            message: "Invalid ball speed",
            data: null,
          });
      }

      console.log("run>>>>>>>>>>>>", currentRun);
    let playersUpdate = groupExist.updatedPlayers.find((players)=>players.UserId === UserId)
      // groupExist.updatedPlayers[index].hit = true;
      // groupExist.updatedPlayers[index].isRunUpdated = true;
      // updatedRun = updatedRun + currentRun;

      // groupExist.updatedPlayers[index].run = updatedRun;

      updatedRun = updatedRun + currentRun;
      playersUpdate.hit = true;
      playersUpdate.isRunUpdated = true;
      playersUpdate.run = updatedRun;

      let updatedGroupFstHit = await groupModel.findOneAndUpdate({ _id: groupId,
         updatedPlayers: { $elemMatch: { UserId: UserId } } },
        { $set: { "updatedPlayers.$": playersUpdate } },
        { new: true })
      let wicket = groupExist.updatedPlayers[index].wicket;

      if (ball === 0 && isWicketUpdated === true && wicket > 0) {
        groupExist.updatedPlayers[index].wicket -= 1;
        updatedGroupFstHit = await groupExist.save();
      }

      let responseForFstHit = {
        _id: updatedGroupFstHit._id,
        createdTime: updatedGroupFstHit.createdTime,
        tableId: updatedGroupFstHit.tableId,
        updatedPlayers: updatedGroupFstHit.updatedPlayers,
        ball: updatedGroupFstHit.ball,
        start: updatedGroupFstHit.start,
        currentBallTime: updatedGroupFstHit.currentBallTime,
        nextBallTime: updatedGroupFstHit.nextBallTime,
        ballSpeed: updatedGroupFstHit.ballSpeed,
        CurrentRun: currentRun,
      };

      console.log("updatedRunwhen hit >>>>>>>>>>>>>>>>>>", updatedGroupFstHit.updatedPlayers[0].run);

      //send the response when hit the api 1st time
      return res.status(200).json(responseForFstHit);

    }
    if (isRunUpdated === true) {
    let response = {
      _id: groupExist._id,
      createdTime: groupExist.createdTime,
      tableId: groupExist.tableId,
      updatedPlayers: groupExist.updatedPlayers,
      ball: groupExist.ball,
      start: groupExist.start,
      currentBallTime: groupExist.currentBallTime,
      nextBallTime: groupExist.nextBallTime,
      ballSpeed: groupExist.ballSpeed,
    };

    return res.status(200).json(response);
  }
    // }
  } catch (err) {
    return res.status(500).send;
  }
};

//__________________________declare the winner_______________________________

const winTheGame = async function (req, res) {
  try {
    const groupId = req.query.groupId;

    /* lean() method on the groupModel.findById() query to return a plain JavaScript object instead of a Mongoose document.
     This can improve performance by avoiding the overhead of Mongoose document instantiation.*/

    const checkGroup = await groupModel.findById(groupId).lean();

    if (!checkGroup) {
      return res.status(404).send({
        status: false,
        message: "this group is not present in DB",
      });
    }
    const players = checkGroup.updatedPlayers.sort((a, b) => b.run - a.run);
    const winner = players[0];
    //filter the players's run if these are equal
    const equalRun = players.filter((a) => a.run === winner.run);

    // find the player with the lowest wickets among those with equal runs.
    const winner2 = equalRun.reduce((a, b) => (b.wicket < a.wicket ? b : a));

    const finalWinner = winner2.run > winner.run ? winner2 : winner;

    return res.status(200).json({ updatedPlayers: players });
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
  winTheGame,
};
