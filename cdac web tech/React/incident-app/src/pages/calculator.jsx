
export  function Calculator() {
    return (
        <div className="container py-5">
            <div className="mb-3">
                 <h1>Calulator</h1>
                <hr />
<input type="number" />
            </div>
            <div className="mb-3">
              <input type="number" />
            </div>
            <button className="btn btn-dark p-2 m-3" >Add</button>
            <button  className="btn btn-dark p-2 m-3" >Substract</button>
            <button  className="btn btn-dark p-2 m-3" >Multiply</button>
            <button  className="btn btn-dark p-2 m-3" >power</button>
            <button  className="btn btn-dark p-2 m-3" >Divide</button>
            <button  className="btn btn-dark p-2 m-3" >Reminder</button>
        </div>
    

    )
}
