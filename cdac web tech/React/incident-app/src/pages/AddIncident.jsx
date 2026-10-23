import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddIncident() {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [severity, setSeverity] = useState("")
    const [status, setStatus] = useState("")
    const [description, setDescription] = useState("")
    const [formValues, setFormValues] = useState({})
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        //axios to send form data on server
        const data = {
            _id: "#INC" + Date.now(),
            user: "user001",
            title,
            category,
            status,
            severity,
            description,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        setFormValues(data);

    }

    useEffect(function () {
        if (formValues.title) {


            console.log(formValues)
            console.log("useEffect run")
            alert("Incident saved")
            navigate("/list", { state: formValues })
        }
    }, [formValues])

    return (

        <div className=" alert bg-dark text-white mt-5 px-5 py-4 w-50 mx-auto">
            <form className="w-fit" onSubmit={handleSubmit}>

                <h1>Add Incident</h1>
                <hr/>
                {formValues.user}
                <div className="mb-3">
                    {/* <label htmlFor="title" className="form-label ">Title</label> */}
                    <input className="form-control form-control-sm" 
                    value={title} 
                    onChange={function (event) {
                    setTitle(event.target.value)
                    }}
                        placeholder="Enter Title" 
                        id="title" />
                </div>

                <div className="mb-3">
                    {/* <label htmlFor="category" className="form-label" >Category</label> */}
                    <select id="category" className="form-select form-select-sm" value={category} onChange={function (event) {
                        setCategory(event.target.value)
                    }} >
                        <option value>Select Category</option>
                        <option value="phising">Phising</option>
                        <option value="malware">Malware</option>
                        <option value="db_error">DB Error</option>
                        <option value="server_error">Server Error</option>
                    </select>
                </div>

                <div className="mb-3">
                    {/* <label htmlFor="severity" className="form-label">Severity</label> */}
                    <select id="severity" className="form-select  form-select-sm" value={severity} onChange={function (event) {
                        setSeverity(event.target.value)
                    }} >
                        <option value>Select Severity</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div className="mb-3">
                    {/* <label htmlFor="status" className="form-label">Status</label> */}
                    <select id="status" className="form-select  form-select-sm" value={status} onChange={function (event) {
                        setStatus(event.target.value)
                    }} >
                        <option value>Select Status</option>
                        <option value="open">Open</option>
                        <option value="investigating">Investigating</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>

                <div className="mb-3">
                    {/* <label htmlFor="description" className="form-label">Description</label> */}
                    <textarea 
                    value={description} 
                    className="form-control  form-control-sm"
                    onChange={function (event) {
                        setDescription(event.target.value)
                    }} 
                    id="description"
                    placeholder="Enter Description"></textarea>
                </div>

                <button className="btn btn-outline-success">Add</button>

            </form>
        </div>

    );
}