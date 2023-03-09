const mongoose = require("mongoose");
const userModel = require("../model/userModel");
const balanceModel = require("../model/balanceModel");

const updateBalance = async function(req,res){
    try{
        let updateData = req.query;
        // let UserId = req.query.UserId;
        // let cricketId = req.query.cricketId

        let { UserId,cricketId,objective,chase,multiplayer } = updateData

        let balanceData = await cricketModel.findOne({ $or: [{ _id:cricketId }, { UserId: UserId }] })

        let items = balanceData.items

        let sum = 0;
        let arr = []
        for(let i=0; i<items.length;i++){
          

        const balance = await userModel.findOne({UserId})

         if(objective === true){
           




            } else {
              console.log('User input was not true, cricket wins remain at 0');
            }
         
    
//         for(const balance of user){
//             if(balance.objective === true){
//               cricketModel.wins +=50
//             }
//         }

//            await cricket.save()



        const matchData = await balanceModel.findOneAndUpdate(
            { UserId: UserId },
            updateData,
            { new: true }
          );
      

        if (matchData.length == 0) {
            return res.status(404).send({
              status: false,
              message: "user not found",
            });
          }


    return res.status(200).send({
            status: true,
            message: "Success",
            data: matchData,
          });


    } catch (err) {
        return res.status(500).send({
          status: false,
          error: err.message,
        });
      }
}




module.exports = { updateBalance };