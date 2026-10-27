import { useEffect } from "react"
import { useContext } from "react"
import { TitleContext } from "../App"

export function Home()
{
    const {setTitle,title}=useContext(TitleContext)
    useEffect(function()
{
setTitle("Home")
},[])
    return(<>
    <h1>Home Page</h1>
    </>)
}