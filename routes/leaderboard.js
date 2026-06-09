const express = require("express");
const router = express.Router();

const Leaderboard = require("../models/Leaderboard");


// CREATE SCORE
router.post("/", async(req,res)=>{
try{

const player = await Leaderboard.create(req.body);

res.status(201).json({
success:true,
data:player
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
});


// GET LEADERBOARD
router.get("/", async(req,res)=>{
try{

const leaderboard = await Leaderboard.find()
.sort({score:-1});

const ranked = leaderboard.map((player,index)=>{

player.rank = index + 1;

return player;

});

res.json({
success:true,
data:ranked
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
});


// UPDATE
router.put("/:id", async(req,res)=>{
try{

const player = await Leaderboard.findByIdAndUpdate(
req.params.id,
req.body,
{
new:true
}
);

res.json({
success:true,
data:player
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
});


// DELETE
router.delete("/:id", async(req,res)=>{
try{

await Leaderboard.findByIdAndDelete(req.params.id);

res.json({
success:true,
message:"Player removed"
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
});

module.exports = router;