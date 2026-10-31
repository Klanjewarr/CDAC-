import { useState } from "react"

export function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        alert(`Welcome back, ${email}!`);
        setEmail('');
        setPassword('');
        //clears the input fields after submit
    }

    return (
        <div>
            <div className="container w-50">
                    <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button type="submit"className="btn btn-primary mt-3">Login</button>
                        </form>
                
            </div>
        </div>
    )
}
