const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const tournamentModel = require("../model/tournamentModel");
const cricketModel = require("../model/cricketModel");
const { time } = require("console");

//__________________________________________________Tournament1

const createTournament1 = async function (req, res) {
  try {
    let {
      entryFee,
      prizeAmount,
      players,
      status,
      maxTime,
      rank,
      rank1,
      rank2,
      rank3,
      rank4,
    } = req.query;

    if (Object.keys(req.query).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create createTable",
      });
    }

    //_____________setinterval for create document

    let tournamentTable1;
    let createdAt;

    async function createTournament() {
      tournamentTable1 = await tournamentModel.create(req.query);
      createdAt = tournamentTable1.createdAt;
      console.log(tournamentTable1);
    }
    setInterval(createTournament, 60000);
    createTournament();

    //____________setinterval for delete documents

    let deleteTournament1;

    async function deleteTournament() {
      deleteTournament1 = await tournamentModel.findOneAndDelete({
        createdAt: createdAt,
      });

      console.log(tournamentTable1);
    }
    setInterval(deleteTournament, 300000);
    deleteTournament();

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

//_______________________________________________________________Tournament2

const createTournament2 = async function (req, res) {
  try {
    let {
      entryFee,
      prizeAmount,
      players,
      status,
      maxTime,
      rank,
      rank1,
      rank2,
      rank3,
      rank4,
    } = req.query;

    if (Object.keys(req.query).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create createTable",
      });
    }

    let tournamentTable2;

    async function createTournament() {
      tournamentTable2 = await tournamentModel.create(req.query);
      console.log(tournamentTable2);
    }

    setInterval(createTournament, 6000);
    createTournament();

    return res.status(201).send({
      status: true,
      message: "Success",
      tournamentTable2,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

//_________________________________________________________Tournament3

const createTournament3 = async function (req, res) {
  try {
    let {
      entryFee,
      prizeAmount,
      players,
      status,
      maxTime,
      rank,
      rank1,
      rank2,
      rank3,
      rank4,
    } = req.query;

    if (Object.keys(req.query).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create createTable",
      });
    }

    let tournamentTable3;

    async function createTournament() {
      const tournamentTable3 = await tournamentModel.create(req.query);
      console.log(tournamentTable3);
    }

    setInterval(createTournament, 6000);
    createTournament();

    return res.status(201).send({
      status: true,
      message: "Success",
      tournamentTable3,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

//______________________________________________________Tournament4

const createTournament4 = async function (req, res) {
  try {
    let {
      entryFee,
      prizeAmount,
      players,
      status,
      maxTime,
      rank,
      rank1,
      rank2,
      rank3,
      rank4,
    } = req.query;

    if (Object.keys(req.query).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create createTable",
      });
    }

    let tournamentTable4;

    async function createTournament() {
      const tournamentTable4 = await tournamentModel.create(req.query);
      console.log(tournamentTable4);
    }

    setInterval(createTournament, 6000);
    createTournament();

    return res.status(201).send({
      status: true,
      message: "Success",
      tournamentTable4,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

//______________________________________________________Tournament5

const createTournament5 = async function (req, res) {
  try {
    let {
      entryFee,
      prizeAmount,
      players,
      status,
      maxTime,
      rank,
      rank1,
      rank2,
      rank3,
      rank4,
    } = req.query;

    if (Object.keys(req.query).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create createTable",
      });
    }

    let tournamentTable5;

    async function createTournament() {
      const tournamentTable4 = await tournamentModel.create(req.query);
      console.log(tournamentTable5);
    }

    setInterval(createTournament, 6000);
    createTournament();

    return res.status(201).send({
      status: true,
      message: "Success",
      tournamentTable5,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

//_____________________________________getAll Table_____________________________

const getAllTables = async function (req, res) {
  try {
    let UserId = req.query.UserId;
    let currentTime = new Date();

    const data = await tournamentModel
      .find()
      .select({ display: 0, updatedAt: 0, __v: 0 })
      .select({ Users: 0 });

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

    //_______store user's tournament history

    let time = existUser.createdAt;
    let userHistory = await userModel.findOneAndUpdate(
      { UserId: UserId },
      { $push: { history: { tableId: tableId, time: time } } },
      { new: true }
    );

    console.log(userHistory);
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
  createTournament2,
  createTournament3,
  createTournament4,
  createTournament5,
  updateTournament,
  getAllTables,
};
