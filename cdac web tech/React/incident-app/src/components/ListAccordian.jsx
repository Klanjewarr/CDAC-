import { useSelector, useDispatch } from "react-redux"
import { updateIncidents, deleteIncident } from "../pages/redux/IncidentSlicer"

export function ListAccordian() {
    const incidents = useSelector((state) => state.IncidentReducer.incidents)
    const dispatch = useDispatch()

    return (
        <ul>
            {incidents.map((incident) => (
                <ul key={incident._id}>
                    <span>{incident._id}</span>
                    <span>{incident.title}</span>
                    <span>{incident.user}</span>
                    <li><strong>{incident.category}</strong></li>
                    <li><strong>{incident.status}</strong></li>
                    <li><strong>{incident.severity}</strong></li>
                    <li><strong>{incident.createdAt}</strong></li>
                    <li><strong>{incident.updatedAt}</strong></li>
                    <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => dispatch(updateIncidents({ id: incident._id, ...incident }))}
                    >
                        Update
                    </button>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => dispatch(deleteIncident(incident._id))}
                    >
                        Delete
                    </button>
                    <hr />
                </ul>
            ))}
        </ul>
    )
}