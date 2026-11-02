
function IncidentsList() {
    const mockIncidents = [
        { id: 1, title: "Server Down", severity: "High", status: "Open" },
        { id: 2, title: "Database Slow", severity: "Medium", status: "Investigating" },
        { id: 3, title: "Phishing Email", severity: "Critical", status: "Resolved" }
    ]
    return (
        <div>
           <h1>Incident Reports </h1> 

           {mockIncidents.map((incident)=>{
            return(
                <div key={incident.id} className="card mb-3 p-3 shadow-sm">
                    <h4>{incident.title}</h4>
                    <p>Status:{incident.status}| Severity:{incident.severity}</p>
                </div>
            )
           })}
        </div>
    )
}

export default IncidentsList
