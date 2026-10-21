import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddIncident() {
   const [title,setTitle]=useState("") 
   const [category,setCategory]=useState("") 
   const [severity,setSeverity]=useState("") 
   const [status,setStatus]=useState("") 
   const [description,setDesciption]=useState("") 
   const [formValues,setFormValues]=useState({})
    const navigate=useNavigate()

   function handleSubmit(event)
   {
        event.preventDefault()
        //axios to send form data on server
        new Promise(function(resolve,reject){
 setFormValues({
            _id:"#INC"+Date.now(),
            user:"user001",
            title,
            category,
            status,
            severity,
            description,
            createdAt:Date.now(),
            updatedAt:Date.now()
        })
        resolve()
        }).then(function()
    {
    console.log(formValues)
            // alert("Incident Saved")
            // navigate("/list",{state:formValues})
    })
       

      
   }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Add Incident</h1>
            {formValues.user}
        <div>
          <label htmlFor="title">Title</label>
          <input value={title} onChange={function(event){
            setTitle(event.target.value)
          }} 
          placeholder="Enter Title" id="title" />
        </div>

        <div>
          <label htmlFor="categoary">Category</label>
          <select id="category"
          value={category} onChange={function(event){
            setCategory(event.target.value)
          }} 
          >
            <option value>Select Category</option>
            <option value="phising">Phising</option>
            <option value="malware">Malware</option>
            <option value="db_error">DB Error</option>
            <option value="server_error">Server Error</option>
          </select>
        </div>
        <div>
          <label htmlFor="severity">Severity</label>
          <select id="severity" 
           value={severity} onChange={function(event){
            setSeverity(event.target.value)
          }} 
          >
            <option value>Select Severity</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select id="status"
           value={status} onChange={function(event){
            setStatus(event.target.value)
          }} 
          >
            <option value>Select Status</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea 
           value={description} onChange={function(event){
            setDesciption(event.target.value)
          }} 
          id="description" placeholder="Enter Description"></textarea>
        </div>

        <button>Add</button>
      </form>
    </div>
  );
}