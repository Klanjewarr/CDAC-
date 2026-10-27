import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { TitleContext } from "../App"

export function Calculator() 
    {
        const {setTitle,title}=useContext(TitleContext)
        useEffect(function()
    {
    setTitle("calculator")
    },[])

    const [firstNumber, setFirstNumber] = useState("")
    const [secondNumber, setSecondNumber] = useState("")
    const [result, setResult] = useState("")
    const [history, setHistory] = useState([])

    const saveResult = (answer, calculation) => {
        setResult(answer)
        setHistory((oldHistory) => [...oldHistory, `${calculation} = ${answer}`])
    }

    const handleAdd = () => {
        const answer = Number(firstNumber) + Number(secondNumber)
        saveResult(answer, `${firstNumber} + ${secondNumber}`)
    }

    const handleSubtract = () => {
        const answer = Number(firstNumber) - Number(secondNumber)
        saveResult(answer, `${firstNumber} - ${secondNumber}`)
    }

    const handleMultiply = () => {
        const answer = Number(firstNumber) * Number(secondNumber)
        saveResult(answer, `${firstNumber} × ${secondNumber}`)
    }

    const handleDivide = () => {
        if (Number(secondNumber) === 0) {
            setResult("Cannot divide by zero")
            return
        }
        const answer = Number(firstNumber) / Number(secondNumber)
        saveResult(answer, `${firstNumber} ÷ ${secondNumber}`)
    }

    const handleMod = () => {
        const answer = Number(firstNumber) % Number(secondNumber)
        saveResult(answer, `${firstNumber} % ${secondNumber}`)
    }

    return (
        <div className="container py-5">
            <div className="mb-3">
                <h1>Calculator</h1>
            
                <input
                    className="form-control mb-3"
                    type="number"
                    value={firstNumber}
                    onChange={(event) => setFirstNumber(event.target.value)}
                    placeholder="First number"
                />
            </div>
            <div className="mb-3">
                <input
                    className="form-control"
                    type="number"
                    value={secondNumber}
                    onChange={(event) => setSecondNumber(event.target.value)}
                    placeholder="Second number"
                />
            </div>
            <div>
                <button className="btn btn-dark p-2 m-2" onClick={handleAdd}>Add</button>
                <button className="btn btn-dark p-2 m-2" onClick={handleSubtract}>Subtract</button>
                <button className="btn btn-dark p-2 m-2" onClick={handleMultiply}>Multiply</button>
                <button className="btn btn-dark p-2 m-2" onClick={handleDivide}>Divide</button>
                <button className="btn btn-dark p-2 m-2" onClick={handleMod}>Mod</button>
            </div>
            <h2 className="mt-4">Answer: {result}</h2>

            <h3 className="mt-4">History</h3>
            <ul>
                {history.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
        </div>


    )
}
