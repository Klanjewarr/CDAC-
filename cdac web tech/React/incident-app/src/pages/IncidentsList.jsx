import { useLocation } from "react-router-dom"
import { mockIncidents } from "../data/incidents"
import { ListAccordian } from "../components/ListAccordian"

export function IncidentsList()
{
    const formValues=useLocation()
    console.log(formValues)
    return(<>
    <h1>List</h1>
  <ListAccordian mockIncidents={mockIncidents}/>
    </>)
}