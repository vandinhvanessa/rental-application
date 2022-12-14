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
    const [rentalHistory, setRentalHistory] = useState([]);//sets empty rental history list, lender is the user
    const {authState} = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [listParam, setListParam] = useState('');
    useEffect(() => {
        // get purchase histor
        console.log(authState.username)
        //retrieves rental history list by given username
        axios.get(`http://${hostname}/transactions/byLender/${authState.username}`)
        .then(async (response) => {
            // console.log(response)
            setRentalHistory(response.data) //sets rental history list
            setListParam("All")
        })
        
    }, [])
    //passes in transaction id for its return flag to be set
    //meaning that the lender has received the returned item
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
    //lists out rental history based on selected complete or in-progress category
    return (
        <div className='postHistory'>
            <div className='filters'>
                <input className="SearchBar" type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} />
                    <Select options={listParams} onChange={async (event) => {
                        setListParam(event.value)
                        }} value={listParam} defaultValue={"All"} />
        
            </div>
            <div className="innerPostGrid">
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
                    else if (value.paymentReceived  && (new Date(value.transactionEnd) > Date.now()) && listParam === "In Progress" && !value.itemReturned) {
                        console.log("3")
                        return value;
                    }
                    else if (value.paymentReceived  && (new Date(value.transactionEnd) < Date.now()) && listParam === "Completed" && value.itemReturned) {
                        console.log("5")
                        return value;
                    }
                    else if (listParam === "Completed" && value.itemReturned) {
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
                    <div className="postHistoryContainer">
                        <div className="postHistoryLeft">
                            <Image
                                className="postImage"
                                style={{ width: 450 }}
                                cloudName="ditub0apw"
                                publicId={value.image}
                            />
                        </div>
                        <div className="postHistoryRight">
                            {/* <Link to={`/profile/${value.UserId}`}>{value.username}</Link> */}
                            {value.itemReturned &&
                                <p1 className="itemReturned">Item has been confirmed to have been returned</p1>
                            }
                            <div className="Description">Item Description: {(value.itemDescription)}</div>
                            <div className="totalPrice">Total: ${Number(value.cost)}</div>
                            <div className="startDate">Start Date: {new Date(value.transactionBegin).toLocaleDateString()}</div>
                            <div className="endDate">End Date: {new Date(value.transactionEnd).toLocaleDateString()}</div>
                            {!value.itemReturned &&
                                <button className='buyButton' onClick={() => returnItem(value.id)} >
                                <Link to="/"> Item Returned</Link>
                                </button>
                                
                            }
                            
                        </div>
                        
                    </div>

                );
            })}
            </div>
        </div>
    )
}

export default RentalHistory
