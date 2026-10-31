const express=require("express")
const router = express.Router()

router.get("/",(req,res)=>{
    res.send("incident fetch")
})
router.post("/",(req,res)=>{
    res.send("incident save")
})
router.put("/",(req,res)=>{
    res.send("incident full update")
})
router.patch("/",(req,res)=>{
    res.send("incident parital update")
})
router.delete("/",(req,res)=>{
    res.send("incident deleted")
})

module.exports=router

