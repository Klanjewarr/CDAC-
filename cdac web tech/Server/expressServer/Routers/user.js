const express = require("express")
const jwt = require("jsonwebtoken")
const {authVerifyMiddleware, JWTsecretKey }= require("../config/jwtVerifcation")
const router = express.Router()
const userModel = require("../models/userModel")
const { default: mongoose } = require("mongoose")



router.get("/",authVerifyMiddleware, async (req, res) => {
    const users = await userModel.find()
    if (users.length==0){
        return res.json({msg:"users not found"})
    }
    res.json({msg:"user found", users})
})

router.get("/profile",authVerifyMiddleware,async(req,res)=>{
    const userID =req.user.id
    const userProfile = await userModel.findById(new mongoose.Types.ObjectId(userID)).select('-password -__v')
    if(!userProfile){
        return res.json({msg:"User Not Found"})
    }
    res.json({userProfile})
})

router.get('/:id',authVerifyMiddleware, async(req,res)=>{// params
    const id=req.params.id
    const user=await userModel.findById(new mongoose.Types.ObjectId(id)) 
    if(!user){
        return res.json({msg:"user not found", user: null})
    }
    res.json({msg:"user found", user})
})

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })
    res.json({msg: "logged out"})
})

router.post("/auth",async(req,res)=>{
    const{email,password}=req.body
    const user=await userModel.findOne({
        email:email
    })

    if(!user){
        return res.json({msg:"email-id not matched ",auth:false})
    }

    if(password===user.password){
    //    success==login json web token assign
        const singData={id:user._id, email:user.email, name:user.name}

        const token = jwt.sign(singData,JWTsecretKey)

        res.cookie("token",token,{
            maxAge:60*60*1000, //1hr
            httpOnly:true, //only of https/http 
            secure:false , //for https only 
            sameSite:"lax", 
        })

        res.json({msg:"user login successfull",auth:true})
    }else{
         res.json({msg:"user login failed",auth:false})
    }
})


router.post("/", async (req, res) => {
    console.log(req.body)
    const savedUser = await userModel.create(req.body)
    if (!savedUser) {
        return res.send("User not saved")
    }
    res.json({ msg: "user saved", savedUser })
})


router.put('/:id',authVerifyMiddleware, async(req,res)=>{// params
    const id=req.params.id
    const user=req.body

    const updatedUser = await userModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id),{ $set: user },{new:true})
    if(!updatedUser){
        return res.json({msg:"User not Updated"})
    }
    res.json({msg:"User Fully Updated",updatedUser})
})


router.patch("/", (req, res) => {
    res.send("user parital update")
})


router.delete('/:id', authVerifyMiddleware,async(req,res)=>{// params
    const id=req.params.id
    const user=await userModel.findByIdAndDelete(new mongoose.Types.ObjectId(id)) 
    console.log(user)
    if(!user){
        return res.json({msg:"user not found"})
    }
    res.json({msg:"User Deleted", user})
})

module.exports = router


