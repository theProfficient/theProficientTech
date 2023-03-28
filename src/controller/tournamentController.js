const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const tournamentModel = require("../model/tournamentModel");
const cricketModel = require("../model/cricketModel");
const { time } = require("console");
const _ = require("lodash");
const fakeUsers = require("./dummyUsers");
const { find } = require("lodash");
const {createGroups} = require("../validation/validation");
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
    let tableId1 ;
    async function createTournament1() {
      if(tableId1 != undefined){
        for(let ids = 0; ids<tableId1.length ; ids++){
          let tableIdForT = tableId1[ids]
        let table = await tournamentModel.findOne({ _id: tableIdForT });
  
        if (table != undefined || table != null) {
          let players = table.players;
          let users = table.Users;
  
          if (users.length !== 0) {
            users = users.map((items) => items.userName);
  
            // import dummyusers and add as per need to complete groups
            let dummyUsers = fakeUsers.fakeUsers;
            dummyUsers = dummyUsers.map((items) => items.userName);
  
            const groups = _.chunk(players, 5);
  
            let completePlayers = [
              ...users,
              ...dummyUsers.slice(0, 5 - (users.length % 5)),
            ];
  
            let completeGroups = _.chunk(completePlayers, 5);
            let createGrp = await groupModel.create(completeGroups)
            console.log(createGrp);
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

      tableId1 = tournamentTable1.map((items)=>items._id)
      
       console.log(tournamentTable1);
    }

    setInterval(createTournament1, 60000);
    createTournament1();

    //_______________________create table2 with setinterval an end time________________
    let tableId2;
    async function createTournament2() {
      if(tableId2!= undefined){
      let table = await tournamentModel.findOne({ _id: tableId2 });

      if (table != undefined || table != null) {
        let players = table.players;
        let users = table.Users;

        if (users.length !== 0) {
          users = users.map((items) => items.userName);

          // import dummyusers and add as per need to complete groups
          let dummyUsers = fakeUsers.fakeUsers;
          dummyUsers = dummyUsers.map((items) => items.userName);

          const groups = _.chunk(players, 5);

          let completePlayers = [
            ...users,
            ...dummyUsers.slice(0, 5 - (users.length % 5)),
          ];

          let completeGroups = _.chunk(completePlayers, 5);


          let createGrp = await groupModel.create({group:completeGroups, tableId:tableId2})
          console.log(createGrp);
        }
      }
    }
      endTime = Date.now() + 2* 60 * 1000;
      data2.endTime = req.query.endTime = endTime;

      tournamentTable2 = await tournamentModel.create(data2);
      tableId2 = tournamentTable2._id;
      console.log(tournamentTable2);
    }

    setInterval(createTournament2, 120000);
    createTournament2();

    //_______________________create table3 with setinterval an end time________________
 let tableId3 ;
    async function createTournament3() {
      if(tableId3 != undefined){
        let table = await tournamentModel.findOne({ _id: tableId3 });
  
        if (table != undefined || table != null) {
          let players = table.players;
          let users = table.Users;
  
          if (users.length !== 0) {
            users = users.map((items) => items.userName);
  
            // import dummyusers and add as per need to complete groups
            let dummyUsers = fakeUsers.fakeUsers;
            dummyUsers = dummyUsers.map((items) => items.userName);
  
            const groups = _.chunk(players, 5);
  
            let completePlayers = [
              ...users,
              ...dummyUsers.slice(0, 5 - (users.length % 5)),
            ];
  
            let completeGroups = _.chunk(completePlayers, 5);

            let createGrp = await groupModel.create(completeGroups)
            console.log(createGrp);
          }
        }
      }
      endTime = Date.now() + 5 * 60 * 1000;
      data3.endTime = req.query.endTime = endTime;
      tournamentTable3 = await tournamentModel.create(data3);
      tableId3 = tournamentTable3._id
      console.log(tournamentTable3);
    }
    setInterval(createTournament3, 300000);
    createTournament3();

    //_______________________create table4 with setinterval an end time________________
let tableId4 ;
    async function createTournament4() {
      if(tableId4 != undefined){
        let table = await tournamentModel.findOne({ _id: tableId4 });
  
        if (table != undefined || table != null) {
          let players = table.players;
          let users = table.Users;
  
          if (users.length !== 0) {
            users = users.map((items) => items.userName);
  
            // import dummyusers and add as per need to complete groups
            let dummyUsers = fakeUsers.fakeUsers;
            dummyUsers = dummyUsers.map((items) => items.userName);
  
            const groups = _.chunk(players, 5);
  
            let completePlayers = [
              ...users,
              ...dummyUsers.slice(0, 5 - (users.length % 5)),
            ];
  
            let completeGroups = _.chunk(completePlayers, 5);

            let createGrp = await groupModel.create(completeGroups)
            console.log(createGrp);
          }
        }
      }
      endTime = Date.now() + 10 * 60 * 1000;
      data4.endTime = req.query.endTime = endTime;
      tournamentTable4 = await tournamentModel.create(data4);
      tableId4 = tournamentTable4._id ;
      console.log(tournamentTable4);
    }
    setInterval(createTournament4, 600000);
    createTournament4();

    //_______________________create table5 with setinterval an end time________________
    let tableId5 ;
    async function createTournament5() {
      if(tableId5 != undefined){
        let table = await tournamentModel.findOne({ _id: tableId5 });
  
        if (table != undefined || table != null) {
          let players = table.players;
          let users = table.Users;
  
          if (users.length !== 0) {
            users = users.map((items) => items.userName);
  
            // import dummyusers and add as per need to complete groups
            let dummyUsers = fakeUsers.fakeUsers;
            dummyUsers = dummyUsers.map((items) => items.userName);
  
            const groups = _.chunk(players, 5);
  
            let completePlayers = [
              ...users,
              ...dummyUsers.slice(0, 5 - (users.length % 5)),
            ];
  
            let completeGroups = _.chunk(completePlayers, 5);

            let createGrp = await groupModel.create(completeGroups)
            console.log(createGrp);
          }
        }
      }

      endTime = Date.now() + 15 * 60 * 1000;
      data5.endTime = req.query.endTime = endTime;
      tournamentTable5 = await tournamentModel.create(data5);
      tableId5 = tournamentTable5._id
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
      let endTime = userData[0].endTime;

      return res.status(200).send({
        status: true,
        message: "Success",

        tableId: tableId,
        joined: true,
        currentTime: currentTime,
        endTime: endTime,
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

    //let users = existTable.Users;
    // let uniqueUser = users.find((userIds) => userIds.UserId == UserId);
    // if (uniqueUser) {
    //   return res.status(409).send({
    //     status: false,
    //     message: " one user can play in one match only at a time",
    //   });
    // }

    //________________________________find user,s Name _____________________________________

    let userExist = await userModel.findOne({ UserId: UserId });
    let userName = userExist.userName;
    if (!userExist) {
      return res.status(404).send({
        status: false,
        message: " user not found",
      });
    }
    //_______update table with userId and tableId (if user joined perticular table players incereses by 1 automatically)

    const tableUpdate = await tournamentModel
      .findByIdAndUpdate(
        { _id: tableId },
        {
          $inc: { players: 1 },
          $push: {
            Users: { UserId: UserId, userName: userName, joined: true },
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

    let userExist = await userModel.findOne({ UserId: UserId });
    let userName = userExist.userName;

    if (!userExist) {
      return res.status(404).send({
        status: false,
        message: " user not found",
      });
    }

    const table = await groupModel.findOne({tableId:tableId})
    let groups = table.group
    console.log(groups)
    const user =  groups.find((user)=>user.includes(userName));
    console.log(user);
     let myString = user.join(" ");

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

module.exports = {
  createTournaments,
  updateTournament,
  getAllTables,
  getGroups,
};
