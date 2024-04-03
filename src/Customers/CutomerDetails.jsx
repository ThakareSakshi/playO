import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useContext, useEffect, useState } from 'react';
import AddCustomer from '../AddCustomerForm/AddCustomer';
import axios from 'axios';
import Customer from './Customer';
import { CustomerCtx } from '../context/customerContext';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const CutomerDetails = () => {
    const [entries,setEntries]=useState(10);
    const [isOpened,setIsOpened]=useState(false);
    const[currentPage,setCurrentpage]=useState(1);
    const [currentData,setCurrentData]=useState([]);
     const[pages,setpages]=useState([]);
    const ctx=useContext(CustomerCtx);
    
   
    // const [customersData,setCustomersData]=useState([]);



    const getCustomers=async()=>{
       const response=await axios.get("https://play0-backend.onrender.com/api/get");
       
       ctx.setCustomersData(response.data.data);

    }

    const sortList=async(name)=>{
        const response=await axios.post("https://play0-backend.onrender.com/api/sort",{"name":name});
        
        ctx.setCustomersData(response.data.sorted);
    }

    useEffect(()=>{
         getCustomers();
    },[]);
    useEffect(()=>{
        setpages([]);
        const page=[]
        for( let i=1;i<=Math.ceil(ctx.customersData.length/entries);i++){
            page.push(i);
       }
       setpages(page);
   
       const lastIndex=currentPage*entries;
       const firstIndex=lastIndex-entries;
   
       setCurrentData(ctx.customersData.slice(firstIndex,lastIndex));
       
    },[ctx.customersData,entries,currentPage]);
   
  return (

    <div className='w-full'>
        <div className='flex py-4 px-6 justify-between w-full'>
       <div className=''> <SearchOutlinedIcon style={{fontSize:"40px"}}/>
       <input type='search' className='outline-none'/></div>
        <img src="/Images/user.png"/>

        </div>

        <div className='p-6 flex justify-between items-center'>
            <div><span>Show</span> 
            <select  value={entries} className=' p-1 rounded bg-gray-200 w-[48px] mx-2' onChange={(e)=>setEntries(e.target.value)}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </select>
            <span>Entries</span></div>

            <button className='py-1 px-3 bg-black text-white rounded' onClick={()=>setIsOpened(true)}>+ Add Customer</button>
        </div>

        <div className='w-full px-12'>
        <table className='w-full '>
            <thead>
                <th>Trakcing ID</th>
                <th className="cursor-pointer" onClick={()=>sortList("product")}>Product<ArrowDropDownOutlinedIcon/></th>
                <th className="cursor-pointer" onClick={()=>sortList("customerName")}>Customer <ArrowDropDownOutlinedIcon/></th>
                <th className="cursor-pointer" onClick={()=>sortList("date")}>Date <ArrowDropDownOutlinedIcon/></th>
                <th className="cursor-pointer" onClick={()=>sortList("amount")}>Amount <ArrowDropDownOutlinedIcon/></th>
                <th>Payment Mode</th>
                <th className="cursor-pointer" onClick={()=>sortList("transactionStatus")}>Status <ArrowDropDownOutlinedIcon/></th>
                <th>Action</th>
            </thead>
{     ctx.customersData &&
            <tbody>
              {currentData.map((data)=> <Customer key={data.trackingId} {...data}/>)}
            </tbody>}
        </table>
        </div>

        <div className={`w-full absolute bg-[rgba(0,0,0,.5)] h-full top-0 right-0 ${isOpened?"block":"hidden"}`}>
            <button className='absolute top-6 right-6 z-10' onClick={()=>setIsOpened(false)}>X</button>
            <AddCustomer/>

        </div>
        <div className='flex justify-end px-10 py-4 gap-2 items-baseline'>
            
        <span className='font-medium '>Pages</span>
            { pages.length>1 &&
            pages.map((page,index)=> {return <><div  className={`px-4 py-2 border-[1px] border-black rounded-md ${currentPage==page?"text-white bg-black":" text-black bg-white"} `} onClick={()=>setCurrentpage(page)}>{page}</div></>})

            }</div>

      
    </div>
  )
}

export default CutomerDetails
