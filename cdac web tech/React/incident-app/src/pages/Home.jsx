import { useEffect } from "react"
import { useContext } from "react"
import { TitleContext } from "../App"
import axios from "axios"

export function Home() {
    const { setTitle, title } = useContext(TitleContext)
    useEffect(function () { // u cannot write async / await in useEffect
        setTitle("Home")
        axios.get("http://localhost:5000").then(function(res)
    {
        console.log(res.data)
    }
    ).catch(function(err){
        console.log(err)
    })
    }, [])
    return (<>
        <h1>Home Page</h1>
    </>)
}