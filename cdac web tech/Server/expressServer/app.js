const express = require("express")

const app=express()

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
app.get("/user",(req,res)=>{
    res.send(" link /profile get")
})
app.put("/user",(req,res)=>{
    res.send(" link /profile put")
})
app.post("/user",(req,res)=>{
    res.send(" link /profile post")
})
app.patch("/user",(req,res)=>{
    res.send(" link /profile patch")
})
app.delete("/user",(req,res)=>{
    res.send(" link /profile delete")
})

//user product service(crud)
// get, post, put, patch(partial updat), delete use this method to create a operation on user, product, service 

app.listen(5000, (
    console.log('Server started on http://localhost:5000')
   
))