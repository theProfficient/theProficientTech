const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const balanceModel = require("../model/balanceModel");
const cricketModel = require("../model/cricketModel");

const updateBalance = async function(req,res){
    try{
        let data= req.query;
        let UserId = req.query.UserId
        let cricketId = req.query._id
        let balanceId= req.query._id

     

    //     let { objective,chase,multiplayer,balance,types } = updateData
    //     let balanceData = await balanceModel.findOne({ $or: [{ balanceId:balanceId}, { UserId: UserId }] })
    //     let cricketData = await cricketModel.findOne({cricketId:cricketId})

    //      types = balanceData.types
    //      let arr = []

    //  for (let i=0 ; i< types.length;i++){
    //   if(types[i].objective === true){
    //     arr.push(userModel.balance += 50)
    //   }
    //  }

    //     let items = balanceData.types
    //     let sum = 0;
    //     let arr = []
    //     for(let i=0; i<items.length;i++){
          
      
        const user = await userModel.findOne({UserId:UserId})
        const cricket = await cricketModel.findOne({cricketId:cricketId})
        const balance = await balanceModel.findOne({balanceId:balanceId})


        let {objective,chase,multiplayer} = data
        
        let balancedata = await balanceModel.findOne({balanceId:balanceId , UserId:UserId})

         if(objective === true){
           await userModel.findOne({UserId:UserId})
           balance += 50;
          }   await userModel.findOneAndUpdate({UserId:UserId}, {balance:balance},{new:true})
          let cricketData = await cricketModel.findOne({cricketId:cricketId}, {new:true})
         let  balanceData = await balanceModel.findOneAndUpdate({balanceId:balanceId},{objective:false})
         return res.status(200).send({ status: true, message: "Success", data:cricketData,balanceData })
         
    


    //     const matchData = await userModel.findOneAndUpdate(
    //         { UserId: UserId },
    //         updateData,
    //         { new: true }
    //       );
      
    //       await balanceModel.findOneAndUpdate({ UserId: UserId }, { types: [], objective: true })
    //     if (matchData.length == 0) {
    //         return res.status(404).send({
    //           status: false,
    //           message: "user not found",
    //         });
    //       }

    //       balanceData.save()
    //       cricketData.save()
    // return res.status(200).send({
    //         status: true,
    //         message: "Success",
    //         data: matchData,balanceData,cricketData
    //       });

        }
     catch (err) {
        return res.status(500).send({
          status: false,
          error: err.message,
        });
      }


    }


module.exports = { updateBalance };