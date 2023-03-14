const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const tournamentModel = require("../model/tournamentModel");
const cricketModel = require("../model/cricketModel");

//_______Tournament1

const createTournament1 = async function (req, res) {
  try {
    //let queryData = req.query
    let { entryFee, prizeAmount, players, status,maxTime } = req.query;
  

    if (Object.keys(req.query).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create createTable",
      });
    }

    let tournamentTable1;
    async function createTournament() {
      tournamentTable1 = await tournamentModel.create(req.query)
      console.log(tournamentTable1);
    }

    setInterval(createTournament, 6000);
    createTournament();

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

//_______Tournament2

const createTournament2 = async function (req, res) {
  try {
    let { entryFee, prizeAmount, players, status } = req.query;

    if (Object.keys(req.query).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create createTable",
      });
    }

    const tournamentTable2 = await tournamentModel.create(req.query);

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

//_______Tournament3

const createTournament3 = async function (req, res) {
  try {
    let { entryFee, prizeAmount, players, status } = req.query;

    if (Object.keys(req.query).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create createTable",
      });
    }

    const tournamentTable3 = await tournamentModel.create(req.query);

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

//_______Tournament4

const createTournament4 = async function (req, res) {
  try {
    let { entryFee, prizeAmount, players, status } = req.query;

    if (Object.keys(req.query).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create createTable",
      });
    }

    const tournamentTable4 = await tournamentModel.create(req.query);

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

//_______Tournament5

const createTournament5 = async function (req, res) {
  try {
    let { entryFee, prizeAmount, players, status } = req.query;

    if (Object.keys(req.query).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create createTable",
      });
    }

    const tournamentTable5 = await tournamentModel.create(req.query);

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

const getTables = async function (req, res) {
  try {
    const data = await tournamentModel.find().select({_id:0, createdAt:0, updatedAt: 0, __v: 0 });
    let currentTime = new Date()
    return res.status(201).send({
      status: true,
      message: "Success",
      currentTime :currentTime,
       data,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

//_______________________________________________________update tournament____________________

const updateTournament1 = async function (req, res) {
  try {
    let tableId = req.query.tableId;
    let updateData = req.query;

    let { entryFee, prizeAmount, players, status } = updateData;

    if (Object.keys(updateData).length == 0) {
      return res.status(400).send({
        status: false,
        message: "For updating please enter atleast one key",
      });
    }

    let data = {};
    data.entryFee = entryFee;
    data.prizeAmount = prizeAmount;
    data.players = players;
    data.status = status;

    const tableUpdate = await tournamentModel.findOneAndUpdate(
      { tableId: tableId },
      { $set: data },
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
  createTournament2,
  createTournament3,
  createTournament4,
  createTournament5,
  updateTournament1,
  getTables,
};
