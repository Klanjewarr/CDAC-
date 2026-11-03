const express=require("express")
const router = express.Router()
const incidentModel = require("../models/incidentModel.js")
const { default: mongoose } = require("mongoose")
const {authVerifyMiddleware }= require("../config/jwtVerifcation")



router.get("/",authVerifyMiddleware ,async(req,res)=>{
     const incidents = await incidentModel.find()
    if (incidents.length==0){
        return res.json({msg:"incident not found"})
    }
    res.json({msg:"incident  found", incidents})
})
router.get('/:id', authVerifyMiddleware,async(req,res)=>{// params
    const id=req.params.id
    const incidents =await incidentModel.findById(new mongoose.Types.ObjectId(id)) 
    if(!incidents){
        return res.json({msg:"incident not found", incidents: null})
    }
    res.json({msg:"incident found", incidents})
})

router.post("/",authVerifyMiddleware,async(req,res)=>{
    console.log(req.body)
    const savedIncident = await incidentModel.create(req.body)
    if (!savedIncident ) {
        return res.send("Incident  not saved")
    }
    res.json({ msg: "Incident  saved", savedIncident  })
})

router.put('/:id', authVerifyMiddleware,async(req,res)=>{// params
    const id=req.params.id
    const incident=req.body
 console.log(incident)
    const updatedIncident = await incidentModel.findByIdAndUpdate(new mongoose.Types.ObjectId(id,incident))
    if(!updatedIncident ){
        return res.json({msg:"Incident  not Updated"})
    }
    res.json({msg:"Incident  Fully Updated",updatedIncident })
})

router.patch("/",authVerifyMiddleware,(req,res)=>{
    res.send("incident parital update")
})

router.delete('/:id',authVerifyMiddleware, async(req,res)=>{// params
    const id=req.params.id
    const incident=await incidentModel.findByIdAndDelete(new mongoose.Types.ObjectId(id)) 
    console.log(incident)
    if(!incident){
        return res.json({msg:"incident not found"})
    }
    res.json({msg:"incident Deleted", incident})
})

module.exports=router

