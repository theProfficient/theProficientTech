const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const tournamentModel = require("../model/tournamentModel");
const cricketModel = require("../model/cricketModel");
const { time, group, log } = require("console");
const _ = require("lodash");
const fakeUsers = require("./dummyUsers");
const { find } = require("lodash");
const groupModel = require("../model/groupModel");
//__________________________________________________create all Tournaments

const createTournaments = async function (req, res) {
  try {
    let {
      entryFee,
      prizeAmount,
      players,
      status,
      maxTime,
      endTime,
      rank,
      rank1,
      rank2,
      rank3,
      rank4,
    } = req.query;
    let continueRunning = true;
    //___enter all tournaments data dynamically
    // in every group there are 5 players
    let data1 = {};
    data1.entryFee = req.query.entryFee = 1;
    data1.prizeAmount = req.query.prizeAmount = 1 * 4; // win amount will be entry fee multiply with 4 players(5-1 = 4)
    data1.maxTime = req.query.maxTime = 1;

    let data2 = {};
    data2.entryFee = req.query.entryFee = 10;
    data2.prizeAmount = req.query.prizeAmount = 10 * 4;
    data2.maxTime = req.query.maxTime = 4;

    let data3 = {};
    data3.entryFee = req.query.entryFee = 20;
    data3.prizeAmount = req.query.prizeAmount = 20 * 4;
    data3.maxTime = req.query.maxTime = 5;

    let data4 = {};
    data4.entryFee = req.query.entryFee = 50;
    data4.prizeAmount = req.query.prizeAmount = 50 * 4;
    data4.maxTime = req.query.maxTime = 10;

    let data5 = {};
    data5.entryFee = req.query.entryFee = 100;
    data5.prizeAmount = req.query.prizeAmount = 100 * 4;
    data5.maxTime = req.query.maxTime = 15;

    let tournamentTable1;
    let tournamentTable2;
    let tournamentTable3;
    let tournamentTable4;
    let tournamentTable5;

    //_______________________create table1 with setinterval an end time___________

    let tableId1;
    //   let grpId1 =[];
    //   let group1 ;
    async function createTournament1() {
      if (tableId1 != undefined) {
        for (let ids = 0; ids < tableId1.length; ids++) {
          let tableIdForT = tableId1[ids];
          let table = await tournamentModel.findOne({ _id: tableIdForT });

          if (table != undefined || table != null) {
            let players = table.players;
            let users = table.Users;

            if (users.length !== 0) {
              users = users.map((user) => {
                return {
                  UserId: user.UserId,
                  userName: user.userName,
                };
              });

              // users = users.map((items) => items.userName);
              // let userId =  users.map((items) => items.userId);

              // import dummyusers and add as per need to complete groups
              let dummyUsers = fakeUsers.fakeUsers;
              // dummyUsers = dummyUsers.map((items) => items.userName);

              dummyUsers = dummyUsers.map((user) => {
                return {
                  UserId: user.UserId,
                  userName: user.userName,
                };
              });

              const groups = _.chunk(players, 5);

              let completePlayers = [
                ...users,
                ...dummyUsers.slice(0, 5 - (users.length % 5)),
              ];

              let completeGroups = _.chunk(completePlayers, 5);
              console.log(completeGroups);

              for (let i = 0; i < completeGroups.length; i++) {
                let createGrp = await groupModel.create({
                  group: completeGroups[i],
                  tableId: tableIdForT,
                });
                let grpId1 = createGrp._id;
                let group1 = createGrp.group;
                console.log(createGrp);
                startMatch1(grpId1, group1);
                runUpdateBalls1(grpId1);
              }
            }
          }
        }
      }
      endTime = Date.now() + 1 * 60 * 1000;
      data1.endTime = req.query.endTime = endTime;
      tournamentTable1 = await tournamentModel.insertMany([
        data1,
        data1,
        data1,
        data1,
      ]);

      tableId1 = tournamentTable1.map((items) => items._id);
      console.log(tableId1);

      console.log(tournamentTable1);
    }

    setInterval(createTournament1, 60000);
    createTournament1();

    async function startMatch1(grpId1, group1) {
      console.log("grpid>>>>>>>>>>>", grpId1);
      console.log("groups>>>>>>>>>>>>>>>>>", group1);
      if (grpId1 !== undefined) {
        // for (let innerArray of group2) {
        const result = group1.map((name) => ({
          UserId: name.UserId,
          userName: name.userName,
          run: 0,
          hit: false,
          wicket: 0,
        }));
        console.log("result", result);
        const matchData = await groupModel.findOneAndUpdate(
          { _id: grpId1 },
          { updatedPlayers: result, $set: { start: true } },
          { new: true, setDefaultsOnInsert: true }
        );
        console.log("this is updated data >>>>>>>>>>", matchData);
        // }
      }
    }

    setTimeout(startMatch1, 10000);

    async function updateBalls1(grpId1) {
      let max = 6;

      if (grpId1 != undefined) {
        let updateBall = await groupModel.findByIdAndUpdate(
          { _id: grpId1 },
          {
            $inc: { ball: 1 },
          },
          { new: true }
        );
        let ballCount = updateBall.ball;
        console.log(ballCount);

        if (ballCount > 1) {
          let updatedPlayers = updateBall.updatedPlayers.map((player) => {
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
            { _id: grpId1 },
            { $set: { updatedPlayers } }
          );
        }

        if (ballCount >= max) {
          console.log("Reached maximum ball count!");
          return true;
        }
      }
      return false;
    }

    function runUpdateBalls1(grpId1) {
      let continueRunning = true;
      const minSpeed = 1;
      const maxSpeed = 6;

      async function updateBallsRecursive() {
        if (continueRunning) {
          const isMaxCountReached = await updateBalls1(grpId1);
          if (!isMaxCountReached) {
            setTimeout(async () => {
              //update nextBallTime, currentBallTime and  ballSpeed in every 4 seconds
              let updateBall = await groupModel.findByIdAndUpdate(
                { _id: grpId1 },
                {
                  nextBallTime: new Date(
                    Date.now() + 1 * 4 * 1000
                  ).toISOString(),
                  currentBallTime: Date.now(),
                  ballSpeed:
                    Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) +
                    minSpeed,
                },
                { new: true }
              );

              updateBallsRecursive();
            }, 4000);
          }
        }
      }
      updateBallsRecursive();
    }

    //   //_______________________create table2 with setinterval an end time________________
    let tableId2;
    // let grpId2;
    // let group2;
    async function createTournament2() {
      if (tableId2 != undefined) {
        let table = await tournamentModel.findOne({ _id: tableId2 });

        if (table != undefined || table != null) {
          let players = table.players;
          let users = table.Users;

          if (users.length !== 0) {
            //users = users.map((items) => items.userName);
            users = users.map((user) => {
              return {
                UserId: user.UserId,
                userName: user.userName,
              };
            });

            // import dummyusers and add as per need to complete groups
            let dummyUsers = fakeUsers.fakeUsers;
            // dummyUsers = dummyUsers.map((items) => items.userName);

            dummyUsers = dummyUsers.map((user) => {
              return {
                UserId: user.UserId,
                userName: user.userName,
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
                tableId: tableId2,
              });
              let grpId2 = createGrp._id;
              let group2 = createGrp.group;
              console.log(createGrp);
              startMatch2(grpId2, group2);
              runUpdateBalls2(grpId2);
            }
          }
        }
      }
      endTime = Date.now() + 4 * 60 * 1000;
      data2.endTime = req.query.endTime = endTime;

      tournamentTable2 = await tournamentModel.create(data2);
      tableId2 = tournamentTable2._id;
      console.log(tournamentTable2);
    }

    setInterval(createTournament2, 240000);
    createTournament2();

    async function startMatch2(grpId2, group2) {
      console.log("grpid>>>>>>>>>>>", grpId2);
      console.log("groups>>>>>>>>>>>>>>>>>", group2);
      if (grpId2 !== undefined) {
        const result = group2.map((name) => ({
          UserId: name.UserId,
          userName: name.userName,
          run: 0,
          wicket: 0,
        }));
        console.log("result", result);
        const matchData = await groupModel.findOneAndUpdate(
          { _id: grpId2 },
          { updatedPlayers: result, $set: { start: true } },
          { new: true, setDefaultsOnInsert: true }
        );
        console.log("this is updated data >>>>>>>>>>", matchData);
      }
    }

    setTimeout(startMatch2, 10000);

    async function updateBalls2(grpId2) {
      let max = 6;
      if (grpId2 != undefined) {
        let updateBall = await groupModel.findByIdAndUpdate(
          { _id: grpId2 },
          {
            $inc: { ball: 1 },
          },
          { new: true }
        );
        let ballCount = updateBall.ball;
        console.log(ballCount);

        if (ballCount > 1) {
          let updatedPlayers = updateBall.updatedPlayers.map((player) => {
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
            { _id: grpId2 },
            { $set: { updatedPlayers } }
          );
        }

        if (ballCount >= max) {
          console.log("Reached maximum ball count!");
          return true;
        }
      }
      return false;
    }

    function runUpdateBalls2(grpId2) {
      let continueRunning = true;
      const minSpeed = 1;
      const maxSpeed = 6;

      async function updateBallsRecursive() {
        if (continueRunning) {
          const isMaxCountReached = await updateBalls2(grpId2);
          if (!isMaxCountReached) {
            setTimeout(async () => {
              //update nextBallTime, currentBallTime and  ballSpeed in every 4 seconds

              let updateBall = await groupModel.findByIdAndUpdate(
                { _id: grpId2 },
                {
                  nextBallTime: new Date(
                    Date.now() + 1 * 4 * 1000
                  ).toISOString(),
                  currentBallTime: Date.now(),
                  ballSpeed:
                    Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) +
                    minSpeed,
                },
                { new: true }
              );

              updateBallsRecursive();
            }, 4000);
          }
        }
      }
      updateBallsRecursive();
    }

    //_______________________create table3 with setinterval an end time________________
    let tableId3;
    // let grpId3;
    // let group3;

    async function createTournament3() {
      if (tableId3 != undefined) {
        let table = await tournamentModel.findOne({ _id: tableId3 });

        if (table != undefined || table != null) {
          let players = table.players;
          let users = table.Users;

          if (users.length !== 0) {
            // users = users.map((items) => items.userName);
            users = users.map((user) => {
              return {
                UserId: user.UserId,
                userName: user.userName,
              };
            });
            // import dummyusers and add as per need to complete groups
            let dummyUsers = fakeUsers.fakeUsers;
            // dummyUsers = dummyUsers.map((items) => items.userName);
            dummyUsers = dummyUsers.map((user) => {
              return {
                UserId: user.UserId,
                userName: user.userName,
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
                tableId: tableId3,
              });
              let grpId3 = createGrp._id;
              let group3 = createGrp.group;
              console.log(createGrp);
              startMatch3(grpId3, group3);
              runUpdateBalls3(grpId3);
            }
          }
        }
      }

      let endTime = Date.now() + 5 * 60 * 1000;
      data3.endTime = req.query.endTime = endTime;
      tournamentTable3 = await tournamentModel.create(data3);
      tableId3 = tournamentTable3._id;
      console.log(tournamentTable3);
    }

    setInterval(createTournament3, 300000);
    createTournament3();

    async function startMatch3(grpId3, group3) {
      console.log("grpid>>>>>>>>>>>", grpId3);
      console.log("groups>>>>>>>>>>>>>>>>>", group3);
      if (grpId3 !== undefined) {
        // for (let innerArray of group3) {
        const result = group3.map((name) => ({
          UserId: name.UserId,
          userName: name.userName,
          run: 0,
          wicket: 0,
        }));
        console.log("result", result);
        const matchData = await groupModel.findOneAndUpdate(
          { _id: grpId3 },
          { updatedPlayers: result, $set: { start: true } },
          { new: true, setDefaultsOnInsert: true }
        );
        console.log("this is updated data >>>>>>>>>>", matchData);
      }
      // }
    }

    setTimeout(startMatch3, 10000);

    async function updateBalls3(grpId3) {
      let max = 6;

      if (grpId3 != undefined) {
        let updateBall = await groupModel.findByIdAndUpdate(
          { _id: grpId3 },
          {
            $inc: { ball: 1 },
          },
          { new: true }
        );
        let ballCount = updateBall.ball;
        console.log(ballCount);

        if (ballCount > 1) {
          let updatedPlayers = updateBall.updatedPlayers.map((player) => {
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
            { _id: grpId3 },
            { $set: { updatedPlayers } }
          );
        }

        if (ballCount >= max) {
          console.log("Reached maximum ball count!");
          return true;
        }
      }
      return false;
    }

    function runUpdateBalls3(grpId3) {
      let continueRunning = true;
      const minSpeed = 1;
      const maxSpeed = 6;
      async function updateBallsRecursive() {
        if (continueRunning) {
          const isMaxCountReached = await updateBalls3(grpId3);
          if (!isMaxCountReached) {
            setTimeout(async () => {
              //update nextBallTime, currentBallTime and  ballSpeed in every 4 seconds

              let updateBall = await groupModel.findByIdAndUpdate(
                { _id: grpId3 },
                {
                  nextBallTime: new Date(
                    Date.now() + 1 * 4 * 1000
                  ).toISOString(),
                  currentBallTime: Date.now(),
                  ballSpeed:
                    Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) +
                    minSpeed,
                },
                { new: true }
              );

              updateBallsRecursive();
            }, 4000);
          }
        }
      }
      updateBallsRecursive();
    }

    //  // _______________________create table4 with setinterval an end time________________
    let tableId4;
    // let grpId4;
    // let group4;
    async function createTournament4() {
      if (tableId4 != undefined) {
        let table = await tournamentModel.findOne({ _id: tableId4 });

        if (table != undefined || table != null) {
          let players = table.players;
          let users = table.Users;

          if (users.length !== 0) {
            // users = users.map((items) => items.userName);

            users = users.map((user) => {
              return {
                UserId: user.UserId,
                userName: user.userName,
              };
            });
            // import dummyusers and add as per need to complete groups
            let dummyUsers = fakeUsers.fakeUsers;
            // dummyUsers = dummyUsers.map((items) => items.userName);
            dummyUsers = dummyUsers.map((user) => {
              return {
                UserId: user.UserId,
                userName: user.userName,
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
                tableId: tableId4,
              });
              let grpId4 = createGrp._id;
              let group4 = createGrp.group;
              console.log(createGrp);
              startMatch4(grpId4, group4);
              runUpdateBalls4(grpId4);
            }
          }
        }
      }
      endTime = Date.now() + 10 * 60 * 1000;
      data4.endTime = req.query.endTime = endTime;
      tournamentTable4 = await tournamentModel.create(data4);
      tableId4 = tournamentTable4._id;
      console.log(tournamentTable4);
    }
    setInterval(createTournament4, 600000);
    createTournament4();

    async function startMatch4(grpId4, group4) {
      console.log("grpid>>>>>>>>>>>", grpId4);
      console.log("groups>>>>>>>>>>>>>>>>>", group4);
      if (grpId4 !== undefined) {
        // for (let innerArray of group4) {
        const result = group4.map((name) => ({
          UserId: name.UserId,
          userName: name.userName,
          run: 0,
          wicket: 0,
        }));
        console.log("result", result);
        const matchData = await groupModel.findOneAndUpdate(
          { _id: grpId4 },
          { updatedPlayers: result, $set: { start: true } },
          { new: true, setDefaultsOnInsert: true }
        );
        console.log("this is updated data >>>>>>>>>>", matchData);
        // }
      }
    }

    setTimeout(startMatch4, 10000);

    async function updateBalls4(grpId4) {
      let max = 6;

      if (grpId4 != undefined) {
        let updateBall = await groupModel.findByIdAndUpdate(
          { _id: grpId4 },
          {
            $inc: { ball: 1 },
          },
          { new: true }
        );
        let ballCount = updateBall.ball;
        console.log(ballCount);

        if (ballCount > 1) {
          let updatedPlayers = updateBall.updatedPlayers.map((player) => {
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
            { _id: grpId4 },
            { $set: { updatedPlayers } }
          );
        }

        if (ballCount >= max) {
          console.log("Reached maximum ball count!");
          return true;
        }
      }
      return false;
    }

    function runUpdateBalls4(grpId4) {
      let continueRunning = true;
      const minSpeed = 1;
      const maxSpeed = 6;

      async function updateBallsRecursive() {
        if (continueRunning) {
          const isMaxCountReached = await updateBalls4(grpId4);
          if (!isMaxCountReached) {
            setTimeout(async () => {
              //update nextBallTime, currentBallTime and  ballSpeed in every 4 seconds

              let updateBall = await groupModel.findByIdAndUpdate(
                { _id: grpId4 },
                {
                  nextBallTime: new Date(
                    Date.now() + 1 * 4 * 1000
                  ).toISOString(),
                  currentBallTime: Date.now(),
                  ballSpeed:
                    Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) +
                    minSpeed,
                },
                { new: true }
              );

              updateBallsRecursive();
            }, 4000);
          }
        }
      }
      updateBallsRecursive();
    }
    //   //_______________________create table5 with setinterval an end time________________
    let tableId5;
    // let grpId5;
    // let group5;

    async function createTournament5() {
      if (tableId5 != undefined) {
        let table = await tournamentModel.findOne({ _id: tableId5 });

        if (table != undefined || table != null) {
          let players = table.players;
          let users = table.Users;

          if (users.length !== 0) {
            // users = users.map((items) => items.userName);
            users = users.map((user) => {
              return {
                UserId: user.UserId,
                userName: user.userName,
              };
            });
            // import dummyusers and add as per need to complete groups
            let dummyUsers = fakeUsers.fakeUsers;
            // dummyUsers = dummyUsers.map((items) => items.userName);
            dummyUsers = dummyUsers.map((user) => {
              return {
                UserId: user.UserId,
                userName: user.userName,
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
                tableId: tableId5,
              });
              let grpId5 = createGrp._id;
              let group5 = createGrp.group;
              console.log(createGrp);
              startMatch5(grpId5, group5);
              runUpdateBalls5(grpId5);
            }
          }
        }
      }
      endTime = Date.now() + 15 * 60 * 1000;
      data5.endTime = req.query.endTime = endTime;
      tournamentTable5 = await tournamentModel.create(data5);
      tableId5 = tournamentTable5._id;
      console.log(tournamentTable5);
    }
    setInterval(createTournament5, 900000);
    createTournament5();

    async function startMatch5(grpId5, group5) {
      console.log("grpid>>>>>>>>>>>", grpId5);
      console.log("groups>>>>>>>>>>>>>>>>>", group5);
      if (grpId5 !== undefined) {
        // for (let innerArray of group5) {
        const result = group5.map((name) => ({
          UserId: name.UserId,
          userName: name.userName,
          run: 0,
          wicket: 0,
        }));
        console.log("result", result);

        const matchData = await groupModel.findOneAndUpdate(
          { _id: grpId5 },
          { updatedPlayers: result, $set: { start: true } },
          { new: true, setDefaultsOnInsert: true }
        );
        console.log("this is updated data >>>>>>>>>>", matchData);
      }
      // }
    }

    setTimeout(startMatch5, 10000);

    async function updateBalls5(grpId5) {
      let max = 6;

      if (grpId5 != undefined) {
        let updateBall = await groupModel.findByIdAndUpdate(
          { _id: grpId5 },
          {
            $inc: { ball: 1 },
          },
          { new: true }
        );
        let ballCount = updateBall.ball;
        console.log(ballCount);

        if (ballCount > 1) {
          let updatedPlayers = updateBall.updatedPlayers.map((player) => {
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
            { _id: grpId5 },
            { $set: { updatedPlayers } }
          );
        }

        if (ballCount >= max) {
          console.log("Reached maximum ball count!");
          return true;
        }
      }
      return false;
    }

    function runUpdateBalls5(grpId5) {
      let continueRunning = true;
      const minSpeed = 1;
      const maxSpeed = 6;

      async function updateBallsRecursive() {
        if (continueRunning) {
          const isMaxCountReached = await updateBalls5(grpId5);
          if (!isMaxCountReached) {
            setTimeout(async () => {
              //update nextBallTime, currentBallTime and  ballSpeed in every 4 seconds

              let updateBall = await groupModel.findByIdAndUpdate(
                { _id: grpId5 },
                {
                  nextBallTime: new Date(
                    Date.now() + 1 * 4 * 1000
                  ).toISOString(),
                  currentBallTime: Date.now(),
                  ballSpeed:
                    Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) +
                    minSpeed,
                },
                { new: true }
              );

              updateBallsRecursive();
            }, 4000);
          }
        }
      }
      updateBallsRecursive();
    }

    return res.status(201).send({
      status: true,
      message: "Success",
      data: tournamentTable1,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

//_____________________________________getAll Tables _____________________________

const getAllTables = async function (req, res) {
  try {
    let UserId = req.query.UserId;
    let currentTime = new Date();

    //______only fetch that table which timing is running

    const data = await tournamentModel
      .find({ endTime: { $gt: new Date() } })
      .select({
        display: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        Users: 0,
        createdTime: 0,
      })
      .sort({ maxTime: 1 });

    //__________fetch dataas per user id (it shows user joined in this table now)

    let userData = await tournamentModel.aggregate([
      {
        $match: {
          Users: {
            $elemMatch: {
              UserId: UserId,
            },
          },
        },
      },
    ]);

    if (userData.length > 0) {
      let tableId = userData.map((items) => items._id);
      console.log(tableId, "------------");
      let endTime = userData.map((items) => items.endTime);

      //______________________________check the match is started or not

      let matchStatus = [];

      for (let id = 0; id < tableId.length; id++) {
        let status = await groupModel.findOne({ tableId: tableId[id] });
        if (status) {
          matchStatus.push({
            tableId: status.tableId,
            start: status.start,
          });
        }
      }
      if (matchStatus.length !== 0) {
        return res.status(200).send({
          status: true,
          message: "Success",
          matchStatus: matchStatus,
          endTime: endTime,
          joined: true,
          currentTime: currentTime,
          data: data,
        });
      }
      //___________return data if group is not created

      let start = false;
      let match = [];
      for (let i = 0; i < tableId.length; i++) {
        match.push({ tableId: tableId[i], start: start });
      }

      return res.status(200).send({
        status: true,
        message: "Success",
        matchStatus: match,
        joined: true,
        currentTime: currentTime,
        data: data,
      });
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      currentTime: currentTime,
      data: data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

//_______________________________________________________update tournament____________________

const updateTournament = async function (req, res) {
  try {
    let tableId = req.query.tableId;
    let UserId = req.query.UserId;
    let updateData = req.query;
    let { status } = updateData;

    if (Object.keys(updateData).length == 0) {
      return res.status(400).send({
        status: false,
        message: "For updating please enter atleast one key",
      });
    }

    let existTable = await tournamentModel.findById({ _id: tableId });
    if (!existTable) {
      return res.status(404).send({
        status: false,
        message: " This table is not present ",
      });
    }
    let ExistPlayers = existTable.players;

    let maxPlayes = 20;

    if (ExistPlayers < maxPlayes) {
      status = "in_progress";
    }
    if (ExistPlayers === maxPlayes - 1) {
      status = "full";
    }
    if (ExistPlayers > maxPlayes - 1) {
      return res.status(400).send({ status: false, message: " Full " });
    }

    let users = existTable.Users;
    let storedUser = users.filter((userIds) => userIds.UserId === UserId);
    console.log(storedUser);

    //________________________________find user,s Name _____________________________________

    let userExist = await userModel.findOne({ UserId: UserId });
    if (!userExist) {
      return res.status(404).send({
        status: false,
        message: " user not found",
      });
    }
    let userName = userExist.userName;

    //_______update table with userId and tableId (if user joined perticular table players incereses by 1 automatically)

    if (storedUser.length !== 0) {
      for (let i = 0; i < storedUser.length; i++) {
        let time = storedUser[i].endTime;
        console.log(time, "time___________");
        if (Math.abs(time.getMinutes() - existTable.endTime.getMinutes()) < 5) {
          return res.status(400).send({
            status: false,
            message: " You can not join",
          });
        }
      }
    }

    const tableUpdate = await tournamentModel
      .findByIdAndUpdate(
        { _id: tableId },
        {
          $inc: { players: 1 },
          $push: {
            Users: {
              UserId: UserId,
              userName: userName,
              joined: true,
              endTime: existTable.endTime,
            },
          },
          $set: { status: status },
        },

        { new: true }
      )
      .select({ players: 1, _id: 0 });

    //_______store user's tournament history in user profile

    let time = existTable.createdAt;
    let userHistory = await userModel.findOneAndUpdate(
      { UserId: UserId },
      { $push: { history: { tableId: tableId, time: time } } },
      { new: true }
    );

    return res.status(200).send({
      status: true,
      message: "Success",
      data: tableUpdate,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

//__________________________________get groups per players and tableId ____________________________________________

const getGroups = async function (req, res) {
  try {
    let tableId = req.query.tableId;
    let UserId = req.query.UserId;

    if (Object.keys(req.query).length <= 1) {
      return res.status(400).send({
        status: false,
        message: " Please provide both tableId and UserId ",
      });
    }
    let userExist = await userModel.findOne({ UserId: UserId });

    if (userExist == null) {
      return res.status(404).send({
        status: false,
        message: " User not found ",
      });
    }
    let userName = userExist.userName;

    const table = await groupModel.findOne({ tableId: tableId });
    console.log(table);

    if (!table) {
      return res.status(404).send({
        status: false,
        message: " This table is not present ",
      });
    }
    let groups = table.group;

    const user = groups.find((user) => user.userName.includes(userName));
    if (!user) {
      return res.status(404).send({
        status: true,
        message: "this user is not present in this group",
      });
    }

    groups = groups.map((items) => items.userName);
    let myString = groups.join(" ");

    return res.status(200).send({
      status: true,
      message: "Success",
      data: myString,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

//________________________________get players with tournamentTableId____________________________________

const getPlayers = async function (req, res) {
  try {
    let players = await tournamentModel
      .find({ endTime: { $gt: new Date() } })
      .sort({ maxTime: 1 })
      .select({ _id: 1, players: 1 });

    if (players.length === 0) {
      return res.status(404).send({
        status: false,
        message: " Data not present",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: players,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

module.exports = {
  createTournaments,
  updateTournament,
  getAllTables,
  getGroups,
  getPlayers,
};
