const express = require("express");
const router = express.Router();

const Tournament = require("../models/Tournament");


// CREATE
router.post("/", async(req,res)=>{
try{

const tournament = await Tournament.create(req.body);

res.status(201).json({
success:true,
data:tournament
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
});


// READ ALL
router.get("/", async(req,res)=>{
try{

const tournaments = await Tournament.find()
.sort({createdAt:-1});

res.json({
success:true,
count:tournaments.length,
data:tournaments
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
});


// READ SINGLE
router.get("/:id", async(req,res)=>{
try{

const tournament = await Tournament.findById(req.params.id);

if(!tournament){

return res.status(404).json({
success:false,
message:"Tournament not found"
});

}

res.json({
success:true,
data:tournament
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

const tournament = await Tournament.findByIdAndUpdate(
req.params.id,
req.body,
{
new:true
}
);

res.json({
success:true,
data:tournament
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

await Tournament.findByIdAndDelete(req.params.id);

res.json({
success:true,
message:"Tournament deleted"
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
});

module.exports = router;