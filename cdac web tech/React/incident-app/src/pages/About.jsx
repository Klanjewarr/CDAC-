import { useEffect } from "react"
import { useContext } from "react"
import { TitleContext } from "../App"
export function About()
    {
        const {setTitle,title}=useContext(TitleContext)
        useEffect(function()
    {
    setTitle("About")
    },[])
    return(<>
    <h1>About</h1>
    </>)
}




