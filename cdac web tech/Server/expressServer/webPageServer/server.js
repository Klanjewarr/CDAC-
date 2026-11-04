const express=require("express")
// const os=require("os")
const path=require("path")

const fs = require('fs') //file system

require("dotenv").config()


const app = express()
app.use(express.static("static"))

app.set("view engine", "ejs")

app.set("views", path.join(__dirname,"views"))

app.get("/",(req,res)=>{
    res.send("Server Started")
})

app.listen(process.env.PORT|5000,()=>{
    console.log("Server Started on http://localhost:5000")
})

app.get("/dash",(req,res)=>{ //after login dashboard
//     console.log(__dirname)
//   res.sendFile(path.join(__dirname,"views","dashboard.html"))
res.render("dashboard")
})
app.get("/login",(req,res)=>{
//   const filedata=  fs.readFileSync("views/login.html","utf-8")
//   console.log(__dirname)
//   res.sendFile(path.join(__dirname,"views","login.html"))
res.render("login")
})
app.get("/about",(req,res)=>{
    res.send("Server Started on about")
})

app.get("/contact",(req,res)=>{
    res.send("Server Started on contact")
})

app.get("/service",(req,res)=>{
    res.send("Server Started on service")
})

app.get("/product",(req,res)=>{
    res.send("Server Started on product")
})

app.get("/register",(req,res)=>{
//      console.log(__dirname)
//   res.sendFile(path.join(__dirname,"views","register.html"))
res.render("register")
})


