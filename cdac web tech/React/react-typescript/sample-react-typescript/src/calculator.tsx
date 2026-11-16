import { useState, type ChangeEvent } from "react"

export function Calculator() {
    const [n1, setn1] = useState(0)
    const [n2, setn2] = useState(0)
    const [result, setResult] = useState(0)

    function add(event: React.MouseEvent) {
        setResult(n1 + n2)

    }
    function div(event: React.MouseEvent) {
        setResult(n1 / n2)

    }
    function sub(event: React.MouseEvent) {
        setResult(n1 -n2)

    }
    function multi(event: React.MouseEvent) {
        setResult(n1 *n2)

    }
    function remi(event: React.MouseEvent) {
        setResult(n1 %n2)

    }
    return (
        <div className="w-full h-screen bg-blue-400  flex items-center justify-center">
            <div className="w-1/3 h-3/4 bg-black text-white flex flex-col items-center justify-center gap-8  rounded-xl">
            <h1 className="">Result: {result}</h1>
            <input className="bg-blue-400 w-1/2 rounded " placeholder="Enter number" value={n1} onChange={(event: ChangeEvent) => setn1(parseInt(event.target.value))} />
            <input className="bg-blue-400 w-1/2 rounded" placeholder="Enter number" value={n2} onChange={(event: ChangeEvent) => setn2(parseInt(event.target.value))} />
            <input className="bg-stone-600 w-1/3 hover:"type="button" onClick={add} value={"Additon"} />
            <input  className="bg-stone-600 w-1/3"type="button" onClick={div} value={"Division"} />
            <input  className="bg-stone-600 w-1/3"type="button" onClick={sub} value={"Substraction"} />
            <input  className="bg-stone-600 w-1/3"type="button" onClick={multi} value={"Multiplication"} />
            <input  className="bg-stone-600 w-1/3"type="button" onClick={remi} value={"Reminder"} />
            </div>
        </div>
    )
}


