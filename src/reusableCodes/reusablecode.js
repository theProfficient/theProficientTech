const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const tournamentModel = require("../model/tournamentModel");
const cricketModel = require("../model/cricketModel");
const _ = require("lodash");
const fakeUsers = require("../controller/dummyUsers");
const { find } = require("lodash");
const groupModel = require("../model/groupModel");

const createGroup = async function (tableId) {
  if (tableId != undefined) {
    let table = await tournamentModel.findOne({ _id: tableId });

    if (table != undefined || table != null) {
      let players = table.players;
      let users = table.Users;

      if (users.length !== 0) {
        users = users.map((user) => {
          return {
            UserId: user.UserId,
            userName: user.userName,
            isBot: user.isBot,
          };
        });
        //________________________________import dummyusers and add as per need to complete groups

        let dummyUsers = fakeUsers.fakeUsers;
        dummyUsers = dummyUsers.map((user) => {
          return {
            UserId: user.UserId,
            userName: user.userName,
            isBot: user.isBot,
          };
        });
        const groups = _.chunk(players, 5);

        let completePlayers = [
          ...users,
          ...dummyUsers.slice(0, 5 - (users.length % 5)),
        ];

        let completeGroups = _.chunk(completePlayers, 5);

        for (let i = 0; i < completeGroups.length; i++) {
          let createGrp = await groupModel.create({
            group: completeGroups[i],
            tableId: tableId,
          });
          let grpId = createGrp._id;
          let group = createGrp.group;
          // console.log(createGrp);
          // setTimeout(function () {
          startMatch(grpId, group);
          // }, 120000);

          // runUpdateBalls(grpId);
        }
      }
    }
  }
};
async function startMatch(grpId, group) {
  // console.log("grpid>>>>>>>>>>>", grpId);
  // console.log("groups>>>>>>>>>>>>>>>>>", group);
  if (grpId !== undefined) {
    const result = group.map((name) => ({
      UserId: name.UserId,
      userName: name.userName,
      isBot: name.isBot,
      run: 0,
      hit: false,
      wicket: 0,
      prize: 0,
      isRunUpdated: name.isRunUpdated,
    }));
    // console.log("result", result);
    const matchData = await groupModel.findOneAndUpdate(
      { _id: grpId },
      { updatedPlayers: result, $set: { start: true } },
      { new: true, setDefaultsOnInsert: true }
    );
    // console.log("this is updated data >>>>>>>>>>", matchData);
    setTimeout(function () {
      runUpdateBalls(grpId);
    }, 7000);
  }
}

// setTimeout(() => {
//   startMatch(grpId, group);
// }, 120000);

async function updateBalls(grpId) {
  let min = 0;
  const minSpeed = 11;
  const maxSpeed = 18;
  if (grpId != undefined) {
    let updateWicket = await groupModel.findByIdAndUpdate({ _id: grpId });
    let ballCountForWicket = updateWicket.ball;

    if (ballCountForWicket < 6 ) {
      let updatedPlayers = updateWicket.updatedPlayers.map((player) => {
        if (!player.hit && player.isBot === false) {
          //___________If the player did not hit the ball, set the wicket to true
          player.wicket += 1;
          player.isRunUpdated = false;
        }
        if (player.hit) {
          //______________If the player did not hit the ball, set the wicket to true
          player.hit = false;
          player.isRunUpdated = false;
        }
        return player;
      });

      await groupModel.updateOne({ _id: grpId }, { $set: { updatedPlayers } });
    }

    if (ballCountForWicket > 0) {
      let updateBall = await groupModel.findByIdAndUpdate(
        { _id: grpId },
        {
          $inc: { ball: -1 },
          nextBallTime: Date.now() + 1 * 7 * 1000,
          currentBallTime: Date.now(),
          ballSpeed:
            Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed,
          isUpdate: false,
        },
        { new: true }
      );

      let ballCount = updateBall.ball;
      // console.log(new Date(), "currentBallTime================");
      console.log(ballCount, "++++ballCount================");
      // console.log(updateBall.nextBallTime, "nextBallTime================");

      const updateRunForBot = updateBall.updatedPlayers.map((botPlayers) => {
        if (botPlayers.isBot === true) {
          //___________Determine if the bot player should be out

          if (botPlayers.run > 1 && Math.random() > 0.5) {
            botPlayers.wicket += 1;
            botPlayers.run += 0;
          } else {
            const possibleValues = [1, 2, 3, 4, 6];

            const randomIndex = Math.floor(
              Math.random() * possibleValues.length
            );

            const randomValue = possibleValues[randomIndex];
            botPlayers.run += randomValue;
          }
        }
        return botPlayers;
      });

      await groupModel.updateOne(
        { _id: grpId },
        { $set: { updatedPlayers: updateRunForBot } }
      );
    }
    if (ballCountForWicket <= min) {
      let endTheMatch = await groupModel.findByIdAndUpdate(
        { _id: grpId },
        {
          isMatchOver: true,
        },
        { new: true }
      );
      console.log("Reached minimum ball count!");
      return true;
    }
  }
  return false;
}

function runUpdateBalls(grpId) {
  // console.log("call the runUpdateBalls function >>>>>>>>>>>", grpId);
  if (grpId != undefined) {
    let continueRunning = true;

    async function updateBallsRecursive() {
      if (continueRunning) {
        const isMaxCountReached = await updateBalls(grpId);
        if (!isMaxCountReached) {
          setTimeout(async () => {
            //________________update nextBallTime, currentBallTime and  ballSpeed in every 4 seconds
            updateBallsRecursive();
          }, 7000);
        }
      }
    }
    updateBallsRecursive();
  }
}

module.exports = { startMatch, runUpdateBalls, createGroup };
