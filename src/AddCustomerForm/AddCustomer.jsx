import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CustomerCtx } from "../context/customerContext";
import price from '../product.json'

const AddCustomer = () => {
  const [product, setProduct] = useState("hat");
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState(1.23);
  const [status, setStatus] = useState("process");
  const [paymentMode, setpaymentMode] = useState("Tranfer Bank");
  const [date, setDate] = useState("");
  const [isLoading, setloading] = useState(false);
  const ctx = useContext(CustomerCtx);
  const AddCustomer = async (e) => {
    e.preventDefault();
    setloading(true);



    try {
      const response= await axios.post("https://play0-backend.onrender.com/api/add", {
        product: product,
        customerName: customer,
        amount: amount,
        transactionStatus: status,
        paymentMode: paymentMode,
        date: date,
      });
     
      ctx.setCustomersData((data)=>[...data,response.data.data]);

      setTimeout(() => {
        setloading(false);
      }, 200);
    } catch (e) {
      setloading(false);
      alert("something went wrong please try again");
    
    }
  };

  useEffect(()=>{
    setAmount(price[product])
  },[product]);

  const productsList = [
    "hat",
    "laptop",
    "monitor",
    "bag",
    "keyboard",
    "mouse",
    "t-shirt",
    "headset",
    "phone",
    "clock",
  ];
  return (
    <form action="" method="post" onSubmit={AddCustomer}>
      <div className="w-[400px] h-full absolute top-0 right-0 bg-white p-8  flex flex-col justify-between">
        <h1 className="text-xl font-bold">Add Customer</h1>

        <div>
          <p>Select product</p>
          <select
            className="p-2 border-[1px] border-black w-full capitalize"
            name="product"
            onChange={(e) => setProduct(e.target.value)}
            required
          >
            {productsList.map((product) => (
              <option className="capitalize " value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p>Customer Name</p>
          <input
            type="text"
            placeholder="Enter Customer Name"
            className="p-2 border-[1px] border-gray-300 w-full"
            name="customerName"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
        </div>

        <div>
          <p>Date</p>
          <input
            type="Date"
            placeholder=""
            className="p-2 border-[1px] border-gray-300 w-full"
            name="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <p>Amount</p>
          <input
            type="Number"
            placeholder=""
            className="p-2 border-[1px] border-gray-300 w-full text-gray-600 outline-none"
            name="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            readOnly
          />
        </div>
        <div>
          <p>Payment Mode</p>
          <select
            className="p-2 border-[1px] border-black w-full"
            name="paymentMode"
            onChange={(e) => setpaymentMode(e.target.value)}
            required
          >
            <option value={"Transfer Bank"}>Transfer Bank</option>
            <option value={"Cash"}>Cash</option>
          </select>
        </div>
        <div>
          <p>status</p>
          <select
            className="p-2 border-[1px] border-black w-full "
            name="transactionStatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option
              className="text-green-600 p-1 bg-green-100 rounded"
              value={"delivered"}
            >
              Delivered
            </option>
            <option
              className="text-[#CD6200] p-1 bg-orange-100 rounded"
              value={"process"}
            >
              Process
            </option>
            <option
              className="p-1 bg-red-100 rounded w-fit m-2"
              value={"cancelled"}
            >
              Cancelled
            </option>
          </select>
        </div>

        <button
          className="py-2 px-3 bg-black text-white rounded w-full"
          type="submit"
        >
          {isLoading ? "...Saving" : "+ Add"}
        </button>
      </div>
    </form>
  );
};

export default AddCustomer;
