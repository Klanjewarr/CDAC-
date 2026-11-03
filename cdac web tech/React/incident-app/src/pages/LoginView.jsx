import { useEffect, useState } from "react"
import { authProcess } from "./redux/AuthSlicer"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export function LoginView() {
  // const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setisLogin] = useState(false)
  const navigate = useNavigate()
  // const msg = useSelector((state) => state.AuthReducer.msg)
  // const isLogin = useSelector((state) => state.AuthReducer.isLogin)
 

 
  async function handleLogin(e){
     e.preventDefault()
    try{
    const res=await axios.post("http://localhost:5000/user/auth",{email,password},{withCredentials:true})
    alert(res.data.msg)
    setisLogin(res.data.auth)
  
  }
    catch(err){ console.log(err) }
  }

  useEffect(function () {
    
        if (isLogin) {
          
          navigate("/list")
        }
  }, [isLogin])
  return (<>

    <form onSubmit={handleLogin}>
    <h1>isLogin </h1>
    <input placeholder="Enter email-id" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />

    <button>Login</button>
    </form>
  </>)
}