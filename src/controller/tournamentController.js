const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const tournamentModel = require("../model/tournamentModel");
const cricketModel = require("../model/cricketModel");
const _ = require("lodash");
const fakeUsers = require("./dummyUsers");
const { find } = require("lodash");
const groupModel = require("../model/groupModel");
const {
  createGroup,
  startMatch,
  runUpdateBalls,
} = require("../reusableCodes/reusablecode");
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
    let data1 = {
      entryFee: 1,
      prizeAmount: 1 * 4, //___win amount will be entry fee multiply with 4 players(5-1 = 4)
      maxTime: 1,
    };

    let data2 = {
      entryFee: 10,
      prizeAmount: 10 * 4,
      maxTime: 4,
    };

    let data3 = {
      entryFee: 20,
      prizeAmount: 20 * 4,
      maxTime: 5,
    };

    let data4 = {
      entryFee: 50,
      prizeAmount: 50 * 4,
      maxTime: 10,
    };

    let data5 = {
      entryFee: 100,
      prizeAmount: 100 * 4,
      maxTime: 15,
    };

    let tournamentTable1;
    let tournamentTable2;
    let tournamentTable3;
    let tournamentTable4;
    let tournamentTable5;

    //_______________________create table1 with setinterval an end time___________

    let tableId1;

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
                  isBot: user.isBot,
                };
              });
              // import dummyusers and add as per need to complete groups
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
              console.log(completeGroups);

              for (let i = 0; i < completeGroups.length; i++) {
                let createGrp = await groupModel.create({
                  group: completeGroups[i],
                  tableId: tableIdForT,
                });
                let grpId1 = createGrp._id;
                let group1 = createGrp.group;
                console.log(createGrp);
                startMatch(grpId1, group1);

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

    //   //_______________________create table2 with setinterval an end time________________
    let tableId2;

    async function createTournament2() {
      if (tableId2 != undefined) {
        createGroup(tableId2);
      }

      endTime = Date.now() + 4 * 60 * 1000;
      data2.endTime = req.query.endTime = endTime;

      tournamentTable2 = await tournamentModel.create(data2);
      tableId2 = tournamentTable2._id;
      console.log(tournamentTable2);
    }

    setInterval(createTournament2, 240000);
    createTournament2();

    //_______________________create table3 with setinterval an end time________________
    let tableId3;

    async function createTournament3() {
      if (tableId3 != undefined) {
        createGroup(tableId3);
      }

      let endTime = Date.now() + 5 * 60 * 1000;
      data3.endTime = req.query.endTime = endTime;
      tournamentTable3 = await tournamentModel.create(data3);
      tableId3 = tournamentTable3._id;
      console.log(tournamentTable3);
    }

    setInterval(createTournament3, 300000);
    createTournament3();

    //  // _______________________create table4 with setinterval an end time________________
    let tableId4;

    async function createTournament4() {
      if (tableId4 != undefined) {
        createGroup(tableId4);
      }
      endTime = Date.now() + 10 * 60 * 1000;
      data4.endTime = req.query.endTime = endTime;
      tournamentTable4 = await tournamentModel.create(data4);
      tableId4 = tournamentTable4._id;
      console.log(tournamentTable4);
    }
    setInterval(createTournament4, 600000);
    createTournament4();

    //   //_______________________create table5 with setinterval an end time________________
    let tableId5;

    async function createTournament5() {
      if (tableId5 != undefined) {
        createGroup(tableId5);
      }
      endTime = Date.now() + 15 * 60 * 1000;
      data5.endTime = req.query.endTime = endTime;
      tournamentTable5 = await tournamentModel.create(data5);
      tableId5 = tournamentTable5._id;
      console.log(tournamentTable5);
    }
    setInterval(createTournament5, 900000);
    createTournament5();

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
    let isBot = userExist.isBot;

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
              isBot: isBot,
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

    const table = await groupModel.find({ tableId: tableId });
    console.log(table);

    if (table.length === 0) {
      return res.status(404).send({
        status: false,
        message: " This table is not present ",
      });
    }
    let groups = table.map((items) => items.group);
    console.log(groups, "groups>>>>>>>>>>>");
    let user, groupId, users;
    for (let group = 0; group < groups.length; group++) {
      console.log(groups[group], "================================");
      let findUser = groups[group].find((user) => user.userName === userName);
      if (findUser != null) {
        user = findUser;
        groupId = table[group]._id;
        users = groups[group];
        break;
      }
    }

    if (!user) {
      return res.status(404).send({
        status: true,
        message: "this user is not present in any group",
      });
    }

    console.log(user, ">>>>>>>>>>>>>");
    users = users.map((items) => items.userName);
    let usersNameInStr = users.join(" ");

    return res.status(200).send({
      status: true,
      message: "Success",
      groupId,
      usersNameInStr,
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
}
