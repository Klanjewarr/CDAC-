const express = require("express")
const router = express.Router()
const userModel = require("../models/userModel")
const { default: mongoose } = require("mongoose")
const  jwt = require("jsonwebtoken")

const JWTsecretKey="this-is-a-secret-jwtkey-for-tokens"

const authVerifyMiddleware=(req,res,next)=>{
    const token = req.cookie.token
    if(!token){
        return res.json({msg:"token not found"})
    }
    const decoded=jwt.verify(token,JWTsecretKey)

    const user =decoded
    req.user=user
    next()
}

router.get("/",authVerifyMiddleware, async (req, res) => {
    const users = await userModel.find()
    if (users.length==0){
        return res.json({msg:"users not found"})
    }
    res.json({msg:"user found", users})
})

router.get('/:id',authVerifyMiddleware, async(req,res)=>{// params
    const id=req.params.id
    const user=await userModel.findById(new mongoose.Types.ObjectId(id)) 
    if(!user){
        return res.json({msg:"user not found", user: null})
    }
    res.json({msg:"user found", user})
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
        const singData={id:user._id,email,name:user.name}

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


router.post("/",authVerifyMiddleware, async (req, res) => {
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

    const updatedUser = await userModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id,user))
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

