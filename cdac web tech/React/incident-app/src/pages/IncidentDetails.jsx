import { useEffect } from "react"
import { useContext } from "react"
import { TitleContext } from "../App"
export function IncidentDetails()
{
    const {setTitle,title}=useContext(TitleContext)
        useEffect(function()
    {
    setTitle("IncidentDetails")
    },[])
    return(<>
    <h1>Incident</h1>
    </>)
}