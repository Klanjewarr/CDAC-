export function ListAccordian(props) {

    const {mockIncidents}=props
   
    return (
        <div className="accordion w-50 mx-auto" id="accordionExample">
            {
                mockIncidents.map(function(incidents,i){

         return (  <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${i}`} aria-expanded="true" aria-controls="collapseOne me-2">
                      <span className="badge text-bg-primary me-2">{incidents._id}</span> 
                      <span className="badge text-bg-primary me-2">{incidents.title}</span> 
                      <span className="badge text-bg-primary me-2">{incidents.user}</span> 
                    </button>
                </h2>
                <div id={`collapse-${i}`} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <li class="list-group-item"><strong>{incidents.category}</strong></li>
                        <li class="list-group-item"><strong>{incidents.status}</strong></li>
                        <li class="list-group-item"><strong>{incidents.severity}</strong></li>
                        <li class="list-group-item"><strong>{incidents.createdAt}</strong></li>
                        <li class="list-group-item"><strong>{incidents.updatedAt}</strong></li>
                        </div>
                </div>
            </div>
          )
})
}
        </div>
    )
}