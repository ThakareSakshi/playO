import React, { useContext } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import axios from "axios";
import { useState } from "react";
import { CustomerCtx } from "../context/customerContext";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

const Customer = (props) => {
  const [updating, setupdating] = useState(false);
  const [customer, setCustomer] = useState(props.customerName);
  const [amount, setAmount] = useState(props.amount);
  const [product, setProduct] = useState(props.product);

  const [status, setStatus] = useState(props.transactionStatus);
  const [paymentMode, setpaymentMode] = useState(props.paymentMode);
  const [date, setDate] = useState(props.date);
  const ctx = useContext(CustomerCtx);

  const updateConstumer = async () => {
    const updateObject = {
      product: product,
      amount: amount,
      customerName: customer,
      transactionStatus: status,
      date: date,
      paymentMode: paymentMode,
    };
    await axios.patch(
      `https://play0-backend.onrender.com/api/update?id=${props._id}`,
      updateObject
    );
    const updatedList = await axios.get(
      "https://play0-backend.onrender.com/api/get"
    );
    setupdating(false);
    ctx.setCustomersData([...updatedList.data.data]);
  };

  const deleteCustomer = async () => {
    const deletedList = await axios.delete(
      `https://play0-backend.onrender.com/api/delete?id=${props._id}`
    );
    const response = await axios.get(
      "https://play0-backend.onrender.com/api/get"
    );
    ctx.setCustomersData(response.data.data);
  };

  return (
    <tr className="text-center odd:bg-gray-100 text-sm">
      {!updating ? (
        <>
          <td className="p-3 py-4 font-medium">#{props.trackingId}</td>
          <td className="p-3 py-4 flex items-center gap-4">
            <img src={`/Images/${props.product}.png`} />
            {props.product}
          </td>
          <td className="p-3 py-4">{props.customerName}</td>
          <td className="p-3 py-4">{props.date.split("T")[0]}</td>
          <td className="p-3 py-4 font-medium">${props.amount}</td>
          <td className="p-3 py-4">{props.paymentMode}</td>
          <td className="p-3 py-4">
            {
              <span
                className={` p-1 px-3 rounded-full ${
                  props.transactionStatus == "delivered"
                    ? "text-green-700  bg-green-100"
                    : props.transactionStatus == "process"
                    ? "text-orange-700  bg-orange-100"
                    : "text-red-700  bg-red-100"
                }`}
              >
                {props.transactionStatus}
              </span>
            }
          </td>
          <td className="p-3 py-4">
            <span onClick={() => setupdating(true)} className="cursor-pointer">
              <EditCalendarOutlinedIcon />
            </span>
            <span onClick={deleteCustomer}>
              <DeleteOutlineOutlinedIcon
                style={{ color: "gray", cursor: "pointer" }}
              />
            </span>
          </td>{" "}
        </>
      ) : (
        <>
          <td className="p-3 py-4 ">#{props.trackingId}</td>
          <td className="p-3 py-4 flex items-center gap-4 text-gray-400">
            <img src={`/Images/${props.product}.png`} />
            {props.product}
          </td>
          <td className="p-3 py-4">
            <input
              type="text"
              className="bg-transparent"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              required
            />
          </td>
          <td className="p-3 py-4">
            <input
              className="bg-transparent"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </td>
          <td className="p-3 py-4">
            <td className="p-3 py-4 font-medium text-gray-400">
              ${props.amount}
            </td>
          </td>
          <td className="p-3 py-4">
            <select
              name="paymentMode"
              className="bg-transparent"
              value={paymentMode}
              onChange={(e) => setpaymentMode(e.target.value)}
              required
            >
              <option value={"Transfer Bank"}>Transfer Bank</option>
              <option value={"Cash"}>Cash</option>
            </select>
          </td>
          <td className="p-3 py-4">
            <select
              name="transactionStatus"
              className="bg-transparent"
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
          </td>
          <td className="p-2 py-4">
            <span className="cursor-pointer" onClick={updateConstumer}>
              <SaveOutlinedIcon />
            </span>
            <span onClick={deleteCustomer}>
              <DeleteOutlineOutlinedIcon
                style={{ color: "gray", cursor: "pointer" }}
              />
            </span>
          </td>
        </>
      )}
    </tr>
  );
};

export default Customer;
