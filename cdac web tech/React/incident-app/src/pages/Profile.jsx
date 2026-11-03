import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/profile", { withCredentials: true })
      .then((res) => {
        if (res.data.userProfile) {
          setUser(res.data.userProfile);
        } else {
          alert("Session expired or user not found. Please log in.");
          navigate("/loginView");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Unable to fetch profile. Redirecting to login.");
        navigate("/loginView");
      });
  }, [navigate]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading profile...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">User Profile</h4>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={() => navigate("/list")}
              >
                Back to Incidents
              </button>
            </div>
            <div className="card-body">
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              <p>
                <strong>Account Created:</strong>{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}