const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const tournamentModel = require("../model/tournamentModel");
const cricketModel = require("../model/cricketModel");
const { time } = require("console");

//__________________________________________________create all Tournaments

const createTournament1 = async function (req, res) {
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

    let data1 = {};
    data1.entryFee = req.query.entryFee = 1;
    data1.prizeAmount = req.query.prizeAmount = 4;
    data1.maxTime = req.query.maxTime = 1;

    let data2 = {};
    data2.entryFee = req.query.entryFee = 5;
    data2.prizeAmount = req.query.prizeAmount = 20;
    data2.maxTime = req.query.maxTime = 2;

    let data3 = {};
    data3.entryFee = req.query.entryFee = 10;
    data3.prizeAmount = req.query.prizeAmount = 40;
    data3.maxTime = req.query.maxTime = 4;

    let data4 = {};
    data4.entryFee = req.query.entryFee = 20;
    data4.prizeAmount = req.query.prizeAmount = 80;
    data4.maxTime = req.query.maxTime = 5;

    let data5 = {};
    data5.entryFee = req.query.entryFee = 50;
    data5.prizeAmount = req.query.prizeAmount = 100;
    data5.maxTime = req.query.maxTime = 10;

    let tournamentTable1;
    let tournamentTable2;
    let tournamentTable3;
    let tournamentTable4;
    let tournamentTable5;

    //_______________________create table1 with setinterval an end time___________

    async function createTournament1() {
      data1.endTime = req.query.endTime = new Date(Date.now() + 1 * 60 * 1000);
      tournamentTable1 = await tournamentModel.create(data1);
      console.log(tournamentTable1);
    }
    setInterval(createTournament1, 60000);
    createTournament1();

    //_______________________create table2 with setinterval an end time________________

    async function createTournament2() {
      data2.endTime = req.query.endTime = new Date(Date.now() + 2 * 60 * 1000);
      tournamentTable2 = await tournamentModel.create(data2);
      console.log(tournamentTable2);
    }
    setInterval(createTournament2, 120000);
    createTournament2();

    //_______________________create table3 with setinterval an end time________________

    async function createTournament3() {
      data3.endTime = req.query.endTime = new Date(Date.now() + 4 * 60 * 1000);
      tournamentTable3 = await tournamentModel.create(data3);
      console.log(tournamentTable3);
    }
    setInterval(createTournament3, 240000);
    createTournament3();

    //_______________________create table4 with setinterval an end time________________

    async function createTournament4() {
      data4.endTime = req.query.endTime = new Date(Date.now() + 5 * 60 * 1000);
      tournamentTable4 = await tournamentModel.create(data4);
      console.log(tournamentTable4);
    }
    setInterval(createTournament4, 300000);
    createTournament4();

    //_______________________create table5 with setinterval an end time________________

    async function createTournament5() {
      data5.endTime = req.query.endTime = new Date(Date.now() + 10 * 60 * 1000);
      tournamentTable5 = await tournamentModel.create(data5);

      console.log(tournamentTable5);
    }
    setInterval(createTournament5, 600000);
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
      .find({ endTime: { $gte: new Date() } })
      .select({
        display: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
        Users: 0,
        createdTime: 0,
      });
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
      let tableId = userData[0]._id;

      return res.status(200).send({
        status: true,
        message: "Success",

        tableId: tableId,
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

    let existUser = await tournamentModel.findById({ _id: tableId });

    let users = existUser.Users;
    let ExistPlayers = existUser.players;

    let maxPlayes = 10;

    if (ExistPlayers < maxPlayes) {
      status = "in_progress";
    }
    if (ExistPlayers === maxPlayes - 1) {
      status = "full";
    }
    if (ExistPlayers > maxPlayes - 1) {
      return res.status(400).send({ status: false, message: " Full " });
    }

    let uniqueUser = users.find((userIds) => userIds.UserId == UserId);
    if (uniqueUser) {
      return res.status(409).send({
        status: false,
        message: " one user can play in one match only at a time",
      });
    }

    //_______update table with userId and tableId (if user joined perticular table players incereses by 1 automatically)

    const tableUpdate = await tournamentModel
      .findByIdAndUpdate(
        { _id: tableId },
        {
          $inc: { players: 1 },
          $push: { Users: { UserId: UserId, joined: true } },
          $set: { status: status },
        },

        { new: true }
      )
      .select({ players: 1, _id: 0 });

    //_______store user's tournament history in user profile

    let time = existUser.createdAt;
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

module.exports = {
  createTournament1,
  updateTournament,
  getAllTables,
};
