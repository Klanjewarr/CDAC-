import { useLocation } from "react-router-dom";
import { mockIncidents } from "../data/incidents";
import { ListAccordian } from "../components/ListAccordian";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
export const IncidentsListContext = createContext();
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./redux/AuthSlicer";
import axios from "axios";


export function IncidentsList() {
  // const user = useSelector((state) => state.AuthReducer.user);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [incident, setincident] = useState([])

  useEffect(
    function () {
      axios.get("http://localhost:5000/incident", { withCredentials: true }).then(function (res) {
        setincident(res.data.incident)
      }).catch(function (err) {
        console.log(err)
      })    
    },
    []
  );
  // const formValues = useLocation().state;
  // console.log(formValues);
  async function handleLogout() {
    try {
      const res = await axios.post("http://localhost:5000/user/logout", {}, { withCredentials: true })
      alert(res.data.msg)
      navigate("/loginView")
    } catch (err) {
      console.log(err)
    }
  }
  function handleProfile() {
    navigate("/user-profile")
  }
  return (
    <div className="alert alert-dark mx-auto w-75">
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleProfile}>⚙️Profile</button>
      <h1 className="text-center">List</h1>
      <hr />
      <IncidentsListContext.Provider value={incident}>
        <ListAccordian />
      </IncidentsListContext.Provider>
    </div>
  );
}