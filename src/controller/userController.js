/** @format */

const mongoose = require("mongoose");
const userModel = require("../model/userModel");
// const validator = require("../validations/validation");

const createUsers = async function (req, res) {
  try {
    // let UserId = req.query.hasOwnProperty("UserId") ? req.query.UserId : ""
    // let email = req.query.hasOwnProperty("email") ? req.query.email : ""
    // let phone = req.query.hasOwnProperty("phone") ? req.query.phone : ""

    let bodyData = req.query;

    let { UserId, email, phone, balance, status } = bodyData;

    if (Object.keys(bodyData).length == 0) {
      return res.status(400).send({
        status: false,
        message:
          "Body should  be not Empty please enter some data to create user",
      });
    }

    let checkUserId = await userModel.findOne({ UserId: UserId });
    if (checkUserId) {
      return res.status(400).send({
        status: false,
        message: "UserId is already exist ",
      });
    }

    // let checkPhone = await userModel.findOne({ phone: phone });

    // if (checkPhone) {
    //   return res.status(400).send({
    //     status: false,
    //     message: "phone is already exist ",
    //   });
    // }

    // let checkEmail = await userModel.findOne({ email: email });

    //   if (checkEmail) {
    //     return res.status(400).send({
    //       status: false,
    //       message: "this email is already registerd",
    //     });
    //   }

    //  let data = {}
    //  data.UserId = UserId
    //  data.email = email
    //  data.phone = phone
    // data.phone = phone
    //  data.phone = phone

    // const userCreated = await userModel.create(data);

    // if(email || phone){
    const userCreated = await userModel.create(bodyData);

    return res.status(201).send({
      status: true,
      message: "User created successfully",
      data: userCreated,
    });
    // }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error.message,
    });
  }
};

// _______find by query params

const getUser = async function (req, res) {
  try {
    let data1 = req.query.UserId;
    // console.log(data1)

    const getNewUser = await userModel.findOne({ UserId: data1 });

    if (getNewUser.length == 0) {
      return res.status(404).send({
        status: false,
        message: "user not found",
      });
    }
    return res.status(200).send({
      status: true,
      message: "Success",
      data: getNewUser,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

// ___update user

const updateUser = async function (req, res) {
  try {
    let updateData = req.query;
    let UserId = req.query.UserId;

    const user = await userModel.findOneAndUpdate(
      { UserId: UserId },
      updateData,
      { new: true }
    );

    if (user.length == 0) {
      return res.status(404).send({
        status: false,
        message: "user not found",
      });
    }

    return res.status(200).send({
      status: true,
      message: "Success",
      data: user,
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message,
    });
  }
};

// //__deleteUser

// const deleteUser = async function(req, res) {
//   try{

//     let deleteData =   req.query.UserId

//     const user = await userModel.findOneAndUpdate({UserId:updateData} , {new:true});

//   }catch (err) {
//     return res.status(500).send({
//       status: false,
//       error: err.message,
//     });
//   }
// }
module.exports = { createUsers, getUser, updateUser };
