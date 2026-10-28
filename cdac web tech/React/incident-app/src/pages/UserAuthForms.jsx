import { useState } from "react"
// import { Login } from "./LoginView"
// import { Register } from "./RegisterView"
import { Register } from "./Register"
import { Loign } from "./Login"

export function UserAuthForms()
{


    // if(isLogin)
    // {
    //     return(<Login/>)
    // }
    // else
    // {
    //     return(<Register/>)
    // }


    const [isLogin,setIsLogin]=useState(true)
    return(<>
   <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active"  data-bs-toggle="pill"  onClick={function()
        {
            setIsLogin(true)
        }
    }  type="button" role="tab" >Login</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link"  data-bs-toggle="pill"  onClick={function()
        {
            setIsLogin(false)
        }
    }  type="button" >Register</button>
  </li>
 
</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
    {
        isLogin?<Loign />:<Register/>
    }
    </div>
 
 
</div>
    </>)
}