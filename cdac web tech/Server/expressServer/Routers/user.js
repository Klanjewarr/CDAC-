const express = require("express")
const router = express.Router()
const userModel = require("../models/userModel")
const { default: mongoose } = require("mongoose")

router.get("/", async (req, res) => {
    const users = await userModel.find()
    if (users.length==0){
        return res.json({msg:"users not found"})
    }
    res.json({msg:"user found", users})
})

router.get('/:id', async(req,res)=>{// params
    const id=req.params.id
    const user=await userModel.findById(new mongoose.Types.ObjectId(id)) 
    if(!user){
        return res.json({msg:"user not found", user: null})
    }
    res.json({msg:"user found", user})
})

router.post("/", async (req, res) => {
    console.log(req.body)
    const savedUser = await userModel.create(req.body)
    if (!savedUser) {
        return res.send("User not saved")
    }
    res.json({ msg: "user saved", savedUser })
})


router.put('/:id', async(req,res)=>{// params
    const id=req.params.id
    const user=req.body

    const updatedUser = await userModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id,user))
    if(!updatedUser){
        return res.json({msg:"User not Updated"})
    }
    res.json({msg:"User Fully Updated",updatedUser})
})


router.patch("/", (req, res) => {
    res.send("user parital update")
})


router.delete('/:id', async(req,res)=>{// params
    const id=req.params.id
    const user=await userModel.findByIdAndDelete(new mongoose.Types.ObjectId(id)) 
    console.log(user)
    if(!user){
        return res.json({msg:"user not found"})
    }
    res.json({msg:"User Deleted", user})
})



module.exports = router

