// create database model for incidents and the incidents should be update, put, get, delete

const mongoose=require('mongoose')

const  incidentSchema=new mongoose.Schema({
    user:{type:String,require:true},
    title:{type:String,require:true},
    severity:{type:String,require:true},
    status:{type:String,require:true},
    description:{type:String,require:true}

},
{
    timestamps:true //creates 2 col created at , updated at
}
)

const incidentModel=mongoose.model("incident",incidentSchema)

module.exports=incidentModel