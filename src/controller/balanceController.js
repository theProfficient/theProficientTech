// /** @format */

const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const cricketModel = require("../model/cricketModel");

const updateBalance = async function (req,res){
try{

  let {UserId,cricMatch,cricWins,cricRuns,type} = req.query

  let cricketData = await cricketModel.findOne({UserId:UserId})
  const user = await userModel.findOne({ UserId: UserId });

 if(type === "objective"){
  cricketData.types.objective = true
  cricketData.types.chase = false
  cricketData.types.multiplayer = false
  user.balance += 50
 }


 if(type === "chase"){
  cricketData.types.objective = false
  cricketData.types.chase = true
  cricketData.types.multiplayer = false
  user.balance += 60
 }


 if(type === "multiplayer"){
  cricketData.types.objective = false
  cricketData.types.chase = false
  cricketData.types.multiplayer = true
  user.balance += 100
 }

 cricketData.cricWins = cricWins
 cricketData.cricMatch = cricMatch
 cricketData.cricRuns = cricRuns
 
const cricketDataUpdate = await cricketModel.findOneAndUpdate({UserId:UserId} , {$set:cricketData} , {new:true})
const userDataUpdate = await userModel.findOneAndUpdate({UserId:UserId} , {$set:user} , {new:true})

userDataUpdate._doc.cricketData = cricketDataUpdate

return res
      .status(200)
      .send({
        status: true,
        message: "Success",
        userDataUpdate
      });




}catch (err) {
      return res.status(500).send({
        status: false,
        error: err.message,
      });
    }

}

// const updateBalance = async function (req, res) {
//   try {
//     let data = req.query;
//     let UserId = req.query.UserId;
//     let cricketId = req.query._id;
//     let balanceId = req.query._id;

//     //     let { objective,chase,multiplayer,balance,types } = updateData
//     //     let balanceData = await balanceModel.findOne({ $or: [{ balanceId:balanceId}, { UserId: UserId }] })
//     //     let cricketData = await cricketModel.findOne({cricketId:cricketId})

//     //      types = balanceData.types
//     //      let arr = []

//     //  for (let i=0 ; i< types.length;i++){
//     //   if(types[i].objective === true){
//     //     arr.push(userModel.balance += 50)
//     //   }
//     //  }

//     //     let items = balanceData.types
//     //     let sum = 0;
//     //     let arr = []
//     //     for(let i=0; i<items.length;i++){

//     const user = await userModel.findOne({ UserId: UserId });
//     const cricket = await cricketModel.findOne({ cricketId: cricketId });
//     const balance = await balanceModel.findOne({ balanceId: balanceId });

//     let { objective, chase, multiplayer } = data;

//     let balancedata = await balanceModel.findOne({
//       balanceId: balanceId,
//       UserId: UserId,
//     });

//     if (objective === true) {
//       await userModel.findOne({ UserId: UserId });
//       balance += 50;
//     }
//     await userModel.findOneAndUpdate(
//       { UserId: UserId },
//       { balance: balance },
//       { new: true }
//     );
//     let cricketData = await cricketModel.findOne(
//       { cricketId: cricketId },
//       { new: true }
//     );
//     let balanceData = await balanceModel.findOneAndUpdate(
//       { balanceId: balanceId },
//       { objective: false }
//     );
//     return res
//       .status(200)
//       .send({
//         status: true,
//         message: "Success",
//         data: cricketData,
//         balanceData,
//       });

//     //     const matchData = await userModel.findOneAndUpdate(
//     //         { UserId: UserId },
//     //         updateData,
//     //         { new: true }
//     //       );

//     //       await balanceModel.findOneAndUpdate({ UserId: UserId }, { types: [], objective: true })
//     //     if (matchData.length == 0) {
//     //         return res.status(404).send({
//     //           status: false,
//     //           message: "user not found",
//     //         });
//     //       }

//     //       balanceData.save()
//     //       cricketData.save()
//     // return res.status(200).send({
//     //         status: true,
//     //         message: "Success",
//     //         data: matchData,balanceData,cricketData
//     //       });
//   } catch (err) {
//     return res.status(500).send({
//       status: false,
//       error: err.message,
//     });
//   }
// };

module.exports = { updateBalance };
