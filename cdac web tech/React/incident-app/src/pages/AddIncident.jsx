import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonField, SelectField } from "../components/FormElements";
import { useContext } from "react";
import { TitleContext } from "../App";

export function AddIncident() 
  {
    const {setTitle,title}=useContext(TitleContext)
    useEffect(function()
{
setTitle("AddIncident")
},[])
  const [incidentTitle, setincidentTitle] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDesciption] = useState("");
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    //axios to send form data on server
    const data = {
      _id: "#INC" + Date.now(),
      user: "user001",
      incidentTitle,
      category,
      status,
      severity,
      description,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setFormValues(data);

  }

  useEffect(function () {
    if (formValues.incidentTitle) {
      console.log(formValues)
      console.log("useEffect Run")
      alert("Incident saved")
      navigate("/list", { state: formValues })
    }
  }, [formValues])

  return (
    <div className="alert bg-dark text-white mt-4 px-5 py-4 w-50 mx-auto">
      <form className="w-fit" onSubmit={handleSubmit}>
        <h1>Add Incident</h1>
        <hr />
        {formValues.user}
        <div className="mb-3">
          {/* <label htmlFor="incidentTitle" className="form-label form-label-sm">incidentTitle</label> */}
          <input className="form-control form-control-sm"
            value={incidentTitle}
            onChange={function (event) {
              setincidentTitle(event.target.value);
            }}
            placeholder="Enter incidentTitle"
            id="incidentTitle"
          />
        </div>

        <div className="mb-3">
          {/* <label htmlFor="categoary" className="form-label form-label-sm">Category</label> */}

          <SelectField
            stateFunction={setCategory}
            statevar={category}
            selectId={"category"}
            optionData={[
              { value: "", text: "Select Category" },
              { value: "phising", text: "Phising" },
              { value: "malware", text: "Malware" },
              { value: "db_error", text: "DB Error" },
              { value: "server_error", text: "Server Error" },
            ]
            }
          />
        </div>
        <div className="mb-3">
          {/* <label htmlFor="severity" className="form-label form-label-sm">Severity</label> */}
          <SelectField
            stateFunction={setSeverity}
            statevar={severity}
            selectId={"severity"}
            optionData={[
              { value: "", text: "Select severity" },
              { value: "high", text: "High" },
              { value: "critical", text: "Critical" },
              { value: "medium", text: "Medium" },
              { value: "low", text: "Low" },
            ]
            }
          />

        </div>
        <div className="mb-3">
          {/* <label htmlFor="status" className="form-label form-label-sm">Status</label> */}

          <SelectField
            stateFunction={setStatus}
            statevar={status}
            selectId={"status"}
            optionData={[
              { value: "", text: "Select Status" },
              { value: "open", text: "Open" },
              { value: "investigating", text: "Investigating" },
              { value: "resolved", text: "Resolved" },
            ]
            }
          />

        </div>
        <div className="mb-3">
          {/* <label htmlFor="description" className="form-label form-label-sm">Description</label> */}
          <textarea
            value={description}
            className="form-control form-control-sm"
            onChange={function (event) {
              setDesciption(event.target.value);
            }}
            id="description"
            placeholder="Enter Description"
          ></textarea>
        </div>
        <ButtonField color={"success"} text={"Add"} isDisable={false} />
        {/* <button className="btn btn-success">Add</button> */}
      </form>
    </div>
  );
}