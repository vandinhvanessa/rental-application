import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { hostname } from "../App.js";
import { Image } from "cloudinary-react";
import CartContext from "./User/Cart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PurchaseHistory() {
  // const calculateSubtotal = (postObject) => {
  //     postObject.subTotal = postObject.pricePerDay * Math.abs(endDate - startDate)/(1000*60*60*24)
  // }
  return (
    <div className="postPage">
      <h1>TEST PAGE</h1>
    </div>
  );
}

export default PurchaseHistory;
