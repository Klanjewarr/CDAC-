import axios from "axios"
import { useState } from "react"

export function RegisterView() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const res = await axios.post("http://localhost:5000/user", { name, email, password })
            const savedUser = res.data.savedUser
            alert(savedUser.name + " " + res.data.msg)
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder="Enter email-id" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
    )
}
