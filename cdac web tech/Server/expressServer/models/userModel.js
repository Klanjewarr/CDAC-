const mongoose=require('mongoose')

const  userSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
},
{
    timestamps:true //creates 2 col created at , updated at
}
)

const userModel=mongoose.model("user",userSchema)

module.exports=userModel