import { useEffect, useState } from "react"
import { authProcess } from "./redux/AuthSlicer"
import { useSelector,useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
export function LoginView()
{
    const dispatch=useDispatch()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const msg=useSelector((state)=>state.AuthReducer.msg)
    const isLogin=useSelector((state)=>state.AuthReducer.isLogin)
const [attempted, setAttempted] = useState(false)

    useEffect(function()
{
    if(isLogin)
if (attempted) {
    if (isLogin) {
      alert(msg)
      navigate("/list")
    } else {
      alert("wrong credentials " + msg)
    }
  }
},[isLogin, attempted])
    return(<>
    <h1>Msg {msg}</h1>
    <h1>isLogin {isLogin?"login":"failed"}</h1>
    <input placeholder="Enter email-id" value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <input placeholder="Enter password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>

   <button onClick={() => { setAttempted(true); dispatch(authProcess({email,password})) }}>Login</button>
    </>)
}