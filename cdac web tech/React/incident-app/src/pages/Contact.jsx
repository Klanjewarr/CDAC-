import { useState, useRef } from "react";

export function Contact() {
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [msg, setMsg] = useState("")
    const [checked, setChecked] = useState(false)
    const[isDisable, setDisabled]=useState(true)

    const nameRef = useRef()
    const mobileRef = useRef()
    const emailRef = useRef()
    const msgRef = useRef()
    const sendBtnRef=useRef()

    const handleSubmit = (event) => {
        event.preventDefault()
        alert("Successfully Sent")
        nameRef.current.style.backgroundColor = 'navy'
        mobileRef.current.style.color = 'white'
        mobileRef.current.style.backgroundColor = 'navy'
        emailRef.current.style.color = 'white'
        emailRef.current.style.backgroundColor = 'navy'
        msgRef.current.style.color = 'white'
        msgRef.current.style.backgroundColor = 'navy'

    }

    const handleCheck = (e) => {
        if (!checked) {
            if (name && mobile && email && msg) {

                setChecked(!checked)
                setDisabled(false)
            }
            else{
                alert("Fill all fields")
            }
        }


    }
    return (<>
        <form onSubmit={handleSubmit}>
            <div className="alert alert-dark w-50 mx-auto p-4">
                <h1>Contact Form</h1>
                <hr />
                <div className="mb-3">
                    <input ref={nameRef} className="form-control form-control-sm"
                        value={name}
                        onChange={function (event) {
                            setName(event.target.value);
                        }}
                        placeholder="Enter Name"

                    />
                </div>
                <div className="mb-3">
                    <input className="form-control form-control-sm"
                        value={mobile}
                        ref={mobileRef}
                        onChange={function (event) {
                            setMobile(event.target.value);
                        }}
                        placeholder="Enter Mobile"

                    />
                </div>
                <div className="mb-3">
                    <input className="form-control form-control-sm"
                        value={email}
                        ref={emailRef}
                        onChange={function (event) {
                            setEmail(event.target.value);
                        }}
                        placeholder="Enter Email-Id"

                    />
                </div>
                <div className="mb-3">
                    <textarea className="form-control form-control-sm"
                        ref={msgRef}
                        onChange={function (event) {
                            setMsg(event.target.value);
                        }}
                        placeholder="Enter Message/Suggesion"

                    >{msg}</textarea>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox"  id="checkDefault" onClick={handleCheck} checked={checked} />
                    <label className="form-check-label" for="checkDefault">
                        I Checked
                    </label>
                </div>

                <button disabled={isDisable} className="btn btn-danger" >Send</button>

            </div>
        </form>
    </>)
}