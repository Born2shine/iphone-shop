import React, {useState, useContext, useEffect } from "react"
import { baseURL } from "../api/baseURL"
import axios from "axios";

const AppContext = React.createContext();
const AppProvider = ({children}) => {
    const [iphones, setiPhones] = useState(null);
    
    const getIphoneData = async () => {
        try {
            const res = await axios.get(`${baseURL}/sell-request/in-stock?sort=new&limit=20&page=1&minPrice=0&maxPrice=2500&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus`)
            const data = res.data.data.data
            const sortedData = data.filter(f => f.name.includes("iPhone"))
            console.log(sortedData)
            setiPhones(sortedData)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        getIphoneData()
    },[])
    
    return (
        <AppContext.Provider value={{
            iphones,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => useContext(AppContext)

export {AppContext, AppProvider}