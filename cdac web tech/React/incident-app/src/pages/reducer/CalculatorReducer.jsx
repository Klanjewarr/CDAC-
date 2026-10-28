import React, { useState } from 'react'
import { ButtonFieldReducer, IntTextField, TextField } from '../../components/FormElements'
import { useReducer } from 'react'

export default function CalculatorReducer() {

    const [n1, setN1] = useState(0)
    const [n2, setN2] = useState(0)
    // const [result, setResult] = useState(0)

    const intialStates={result:0}

    const reducer=(state,action)=>{
        const {n1,n2}=action.payload //user input/payload
        switch(action.type){
            case "add":
                return{...state,result:(n1+n2)}
            case "substract":
                return{...state,result:(n1-n2)}
                
            case "multiply":
                return{...state,result:(n1*n2)}

            case "divide":
                return{...state,result:(n1/n2)}

            case "pow":
                return{...state,result:(n1**n2)}
            case "fact":
                let f=1
                for(let i=1;i<n1;i++){
                    f=f+i
                }
                return{...state,result:f}

            case "eo":
                let even=""
                if(n1%2==0){
                    even="first number is even"
                }
                else if(n2%2==0){
                    even="second nuber is even"
                }
                else if (n1%2==0&&n2%2==0){
                    even='both are even'
                }
                else{
                    even="not a even"
                }
                return{...state,result:(
                         even     )}
            case "prime":
                let prime={n1}
            //    if()
                return{...state,result:(
                         even     )}
            default:
                return state

        }
    }

    const[state,dispatch]=useReducer(reducer,intialStates)

    // function add() {
    //     setResult(parseInt(n1) + parseInt(n2))
    // }
    // function substract() {
    //     setResult(n1 - n2)
    // }
    // function multiply() {
    //     setResult(n1 * n2)
    // }
    // function divide() {
    //     setResult(n1 / n2)
    // }
    // function powerof() {
    //     setResult(n1 ** n2)
    // }

    return (
        <div>
            <div className="alert shadow-lg alert-secondary w-50 mx-auto  ">
                <h1>Result={state.result}</h1>
                <IntTextField stateFunction={setN1} stateVar={n1} pHolder={"Enter a value"} />
                <IntTextField stateFunction={setN2} stateVar={n2} pHolder={"Enter a value"} />

                <button onClick={()=>dispatch(
                    {type:"add",payload:({n1,n2})}
                )}>Add</button>
                <button onClick={()=>dispatch(
                    {type:"substract",payload:({n1,n2})}
                )}>Substract</button>
                <button onClick={()=>dispatch(
                    {type:"multiply",payload:({n1,n2})}
                )}>Multiply</button>
                <button onClick={()=>dispatch(
                    {type:"divide",payload:({n1,n2})}
                )}>Divide</button>
                <button onClick={()=>dispatch(
                    {type:"pow",payload:({n1,n2})}
                )}>Power Of</button>
                <button onClick={()=>dispatch(
                    {type:"fact",payload:({n1,n2})}
                )}>Factorial</button>
                <button onClick={()=>dispatch(
                    {type:"eo",payload:({n1,n2})}
                )}>Even Odd</button>


{/* 
                <ButtonFieldReducer eventFunction={dispatch} isDisable={false} color={"primary"} text={'+'} />
                <ButtonFieldReducer eventFunction={dispatch} isDisable={false} color={"primary"} text={'-'} />
                <ButtonFieldReducer eventFunction={dispatch} isDisable={false} color={"danger"} text={'/'} />
                <ButtonFieldReducer eventFunction={dispatch} isDisable={false} color={"warning"} text={'x'} />
                <ButtonFieldReducer eventFunction={dispatch} isDisable={false} color={"warning"} text={'pow'} /> */}
            </div>
        </div>
    )
}
