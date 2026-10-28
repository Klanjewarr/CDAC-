import { authStore } from "./redux/AuthStore"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { authProcess } from "./redux/AuthSlicer"
import { useState } from "react"

export  function Loign() {
  const dispatch=useDispatch()
  const [email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const msg=useSelector((state)=>state.AuthReducer.msg)
  const isLogin=useSelector((state)=>state.AuthReducer.isLogin)

    
  return (
    <div>
      <h1>Msg {msg}</h1>
      <h1>isLogin {isLogin?"login":"failed"}</h1>
      <input placeholder="Enter email-id" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/>


      <button onClick={()=>dispatch(authProcess({email,password}))}>Login</button>
    </div>
  )
}
