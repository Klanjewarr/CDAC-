import { useLocation } from "react-router-dom";
import { mockIncidents } from "../data/incidents";
import { ListAccordian } from "../components/ListAccordian";
import { createContext, useEffect } from "react";
import { useSelector } from "react-redux";
export const IncidentsListContext = createContext();
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./redux/AuthSlicer";


export function IncidentsList() {
  const user = useSelector((state) => state.AuthReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(
    function () {
      if (user == null) {
        navigate("/user-forms");
      }
    },
    [user],
  );
  const formValues = useLocation().state;
  console.log(formValues);

  return (
    <div className="alert alert-dark mx-auto w-75">
      <button onClick={() => dispatch(logout())}>Logout</button>
      <h1 className="text-center">List</h1>
      <hr />
      <IncidentsListContext.Provider value={mockIncidents}>
        <ListAccordian />
      </IncidentsListContext.Provider>
    </div>
  );
}