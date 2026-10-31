const express = require("express")
const cors = require("cors")

const {connectToMongoDB,  disconnectFromMongoDB} = require('./config/db.js')


const app=express()

app.use(cors({
    origin:"http://localhost:5173"
}))

//routes middleware(it work betn req and res)
const userRouter=require("./Routers/user.js")
const incidentRouter=require("./Routers/incident.js")

app.use(express.json()) //allow json data in 

app.use("/user",userRouter) 
app.use("/incident",incidentRouter) 

app.get("/",(req,res)=>{
    res.send("Server started link /")
})

app.get("/about",(req,res)=>{
    res.send(" link /about")
})
app.post("/login",(req,res)=>{
    console.log(req.query)
    res.send(" link /login")
})
app.post("/resigester",(req,res)=>{
    res.send(" link /resigester")
})
app.put("/profile",(req,res)=>{
    res.send(" link /profile")
})
app.delete("/profile",(req,res)=>{
    res.send(" link /profile deleted")
})
app.get("/user", (req,res)=>{

    res.send(" Link/user")
})

app.post("/user", (req,res)=>{

    res.send(" Link/user")
})
app.put("/user", (req,res)=>{

    res.send(" Link/user")
})
app.patch("/user", (req,res)=>{

    res.send(" Link/user")
})
app.delete("/user", (req,res)=>{

    res.send(" Link/user")
})

app.get("/product", (req,res)=>{

    res.send(" Link/product")
})

app.post("/product", (req,res)=>{

    res.send(" Link/product")
})
app.put("/product", (req,res)=>{

    res.send(" Link/product")
})
app.patch("/product", (req,res)=>{

    res.send(" Link/product")
})
app.delete("/product", (req,res)=>{

    res.send(" Link/product")
})
app.get("/service", (req,res)=>{

    res.send(" Link/service")
})

app.post("/service", (req,res)=>{

    res.send(" Link/service")
})
app.put("/service", (req,res)=>{

    res.send(" Link/service")
})
app.patch("/service", (req,res)=>{

    res.send(" Link/service")
})
app.delete("/service", (req,res)=>{

    res.send(" Link/service")
})

//user product service(crud)
// get, post, put, patch(partial updat), delete use this method to create a operation on user, product, service 

app.listen(5000, ()=>{
   connectToMongoDB().then(function(){
    console.log("Database connected 🎉🎉🚀🫡 😁😂")
   }).catch(function(err){
    console.error(err)
   })
    console.log('Server started on http://localhost:5000')
   
})