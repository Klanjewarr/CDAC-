import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function AddIncident() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    // axios to send form data on server
    const data = {
      _id: "#INC" + Date.now(),
      user: "user001",
      title,
      category,
      status,
      severity,
      description,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString()
    };
    setFormValues(data);
  }

  useEffect(function () {
    if (formValues.title) {
      console.log(formValues);
      console.log("useEffect run");
      alert("Incident Saved");
      navigate("/list", { state: formValues });
    }
  }, [formValues, navigate]);

  return (
    <div className="text-bg-dark mt-4 p-5 w-50 mx-auto rounded shadow">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-3">Add Incident</h2>
        <hr className="border-secondary mb-4" />

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter Title"
            id="title"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="phising">Phising</option>
            <option value="malware">Malware</option>
            <option value="db_error">DB Error</option>
            <option value="server_error">Server Error</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="severity" className="form-label">Severity</label>
          <select
            id="severity"
            className="form-select"
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
            required
          >
            <option value="">Select Severity</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="3"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            id="description"
            placeholder="Enter Description"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success w-100">
          Add Incident
        </button>
      </form>
    </div>
  );
}