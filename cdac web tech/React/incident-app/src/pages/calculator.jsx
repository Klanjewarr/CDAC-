
export function Calculator() {
    return (
        <div className="container py-5 card w-25 justify-content-center  align-items-center">
            <div className="mb-3">
                <h1> Calulator</h1>
                <hr />
                <input type="number" />
            </div>
            <div className="mb-3">
                <input type="number" />
            </div>
            <div hidden={true} className="mb-3">
                <input type="number" />
            </div>

            <div>
            <button className="btn btn-dark p-2 m-3" >+</button>
            <button className="btn btn-dark p-2 m-3" >-</button>
            <button className="btn btn-dark p-2 m-3" >x</button>
            <button className="btn btn-dark p-2 m-3" >x^n</button>
            <button className="btn btn-dark p-2 m-3" >/</button>
            <button className="btn btn-dark p-2 m-3" >%</button>
            </div>
        </div>


    )
}
