import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';
import { hostname } from '../App.js';
import { Image } from 'cloudinary-react'
import CartContext from './User/Cart';
import Select from 'react-select';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const listParams = [{ value: "All", label: "All" }, { value: "Completed", label: "Completed" },
{ value: "In Progress", label: "In Progress" }]
function RentalHistory() {
    // const calculateSubtotal = (postObject) => {
    //     postObject.subTotal = postObject.pricePerDay * Math.abs(endDate - startDate)/(1000*60*60*24)
    // }
    const [rentalHistory, setRentalHistory] = useState([]);
    const {authState} = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [listParam, setListParam] = useState('');
    useEffect(() => {
        // get purchase histor
        console.log(authState.username)
        axios.get(`http://${hostname}/transactions/byLender/${authState.username}`)
        .then(async (response) => {
            // console.log(response)
            setRentalHistory(response.data)
            setListParam("All")
        })
        
        
    }, [])
    const returnItem = (transactionID) => {
        // let stringProduct = JSON.stringify(productPostID)
        // localStorage.setItem("transactionPost", stringPost)
        console.log("Returning Item started")
        console.log(transactionID)
        // console.log(productToPurchase)
        axios.post(`http://${hostname}/transactions/itemReturn/byID/${transactionID}`, transactionID, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          
        // after completing transaction remove item from cart
        // const newCart = cart.filter((product) => product.id !== stringPost.id);        
        // setCart(newCart);
    }
    
    return (
        <div className='postPage'>
            <div className='filters'>
                <input className="SearchBar" type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} />
                    <Select options={listParams} onChange={async (event) => {
                        setListParam(event.value)
                        }} value={listParam} defaultValue={"All"} />
        
            </div>
            {rentalHistory.filter((value) => {
                // console.log(listParam)
                if (value.lender === authState.username){
                    if (searchTerm === "" && listParam === "All" ) {
                        console.log("1")
                        return value;
                    } 
                    else if (value.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) && listParam === "All") {
                        console.log("2")
                        return value;
                    }
                    else if (value.paymentReceived  && (new Date(value.transactionEnd) > Date.now()) && listParam === "In Progress") {
                        console.log("3")
                        return value;
                    }
                    else if (value.paymentReceived  && (new Date(value.transactionEnd) < Date.now()) && listParam === "Completed") {
                        console.log("5")
                        return value;
                    }
                    // else if (searchTerm === "" && value.category.toLowerCase().includes(listParam.toLowerCase())) {
                    //     return value;
                    // }
                    // else if (value.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) && listParam === "All") {
                    //     return value;
                    // }
                }
                
            
        }).map((value, key) => {
                return (
                    <div className="listing">
                        <div className="listingLeft">
                            <Image
                                className="postImage"
                                style={{ width: 450 }}
                                cloudName="ditub0apw"
                                publicId={value.image}
                            />
                        </div>
                        <div className="listingRight">
                            {/* <Link to={`/profile/${value.UserId}`}>{value.username}</Link> */}
                            <div className="Description">Item Description: {(value.itemDescription)}</div>
                            <div className="totalPrice">Total: ${Number(value.cost)}</div>
                            <div className="startDate">Start Date: {new Date(value.transactionBegin).toLocaleDateString()}</div>
                            <div className="endDate">End Date: {new Date(value.transactionEnd).toLocaleDateString()}</div>
                            {!value.itemReturned &&
                                <button className='buyButton' onClick={() => returnItem(value.id)} >Item Returned</button>
                            }
                        </div>
                        
                    </div>

                );
            })}
            
        </div>
    )
}

export default RentalHistory
