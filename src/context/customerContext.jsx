import { createContext,useState } from "react";

export const CustomerCtx=createContext();

const CustomerContext = (props) => {
    const [customersData,setCustomersData]=useState([]);
    

    const data={
        customersData,setCustomersData
    }
  return (
    <CustomerCtx.Provider value={data}>
        {
            props.children
        }
      
    </CustomerCtx.Provider>
  )
}

export default CustomerContext
