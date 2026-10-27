import { useState,useRef, useEffect,useCallback, useMemo } from "react";
import { ButtonField, TextField } from "../components/FormElements";
import { TextAreaField } from "../components/FormElements";
import { useContext } from "react";
import { TitleContext } from "../App";

export function Contact()
{
    const {setTitle,title}=useContext(TitleContext)
    useEffect(function()
{
setTitle("Contact")
},[])
    const [name,setName]=useState("")
    const [mobile,setMobile]=useState("")
    const [email,setEmail]=useState("")
    const [msg,setMsg]=useState("")
    const [accept,setAccept]=useState(false)
    const [sendBtnDisabled,setSendBtnDisabled]=useState(true)

    const nameRef=useRef()
    const mobileRef=useRef()
    const emailRef=useRef()
    const msgRef=useRef()
    const sendBtnRef=useRef()

    const handleSubmit=(event)=>
    {
            event.preventDefault()
            alert("Successfully Sent")
            nameRef.current.style.backgroundColor="navy"
            nameRef.current.style.color="white"

            mobileRef.current.style.backgroundColor="navy"
            mobileRef.current.style.color="white"

            emailRef.current.style.backgroundColor="navy"
            emailRef.current.style.color="white"

            msgRef.current.style.backgroundColor="navy"
            msgRef.current.style.color="white"
    }

    const handleAccept=(event)=>
    {
        if(!accept)
        {
            if(name && mobile && email && msg)
            {
                    setAccept(!accept)
                    setSendBtnDisabled(false)
            }
            else
            {
                alert("Fill all fields")
            }
        }
    }

    // const v=handleAccept()

    useEffect(function()
    {
        console.log("UseEffect....")
    },[handleAccept])

    return(<>
    <form onSubmit={handleSubmit}>

            <div className="alert alert-dark w-50 mx-auto p-4">
            <h1>Contact Form</h1>
            <hr/>
                <div className="mb-3">
                     <TextField 
                        pHolder="Enter Name"
                        stateFunction={setName}
                        stateVar={name}
                        refVar={nameRef}
                        />
                   
                </div>
                <div className="mb-3">

                        <TextField 
                        pHolder="Enter Mobile"
                        stateFunction={setMobile}
                        stateVar={mobile}
                        refVar={mobileRef}
                        />

                   
                </div>
                <div className="mb-3">
                     <TextField 
                        pHolder="Enter Email-id"
                        stateFunction={setEmail}
                        stateVar={email}
                        refVar={emailRef}
                        />
                  
                </div>
                <div className="mb-3">
                    <TextAreaField  pHolder="Enter Message/Suggesion"
                        stateFunction={setMsg}
                        stateVar={msg}
                        refVar={msgRef}/>
                 
                </div>
                <div className="form-check mb-3">
                    <input checked={accept} onClick={handleAccept} 
                    className="form-check-input" type="checkbox"/>
                    <label className="form-check-label">
                        I accept
                    </label>
                </div>         
                <ButtonField isDisable={sendBtnDisabled} text={"Send"} color="danger"/>
                {/* <button disabled={sendBtnDisabled}  className={`btn btn-${}`}>Send</button> */}

            </div>
    </form>
        </>)
}