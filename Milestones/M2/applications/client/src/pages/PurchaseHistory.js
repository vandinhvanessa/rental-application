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
function PurchaseHistory() {
    // const calculateSubtotal = (postObject) => {
    //     postObject.subTotal = postObject.pricePerDay * Math.abs(endDate - startDate)/(1000*60*60*24)
    // }
    const [purchaseHistory, setPurchaseHistory] = useState([]);//sets empty list of purchase history, renter is user
    const {authState} = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [listParam, setListParam] = useState('');
    let username = localStorage.getItem("username")

    const writeReview = (postID) => {

    }
    useEffect(() => {
        // gets purchase history list by username
        console.log(username)
        axios.get(`http://${hostname}/transactions/byRenter/${username}`)
        .then(async (response) => {
            // console.log(response)
            setPurchaseHistory(response.data)//sets the purchase history
            setListParam("All")
        })
        
        
    }, []);
    //returns list of purchase history based on selected complete or in-progress transactions
    //can write a review on that transaction/item
    return (
        <div className='postHistory'>
            <div className='filters'>
                <input className="SearchBar" type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} />
                    <Select options={listParams} onChange={async (event) => {
                        setListParam(event.value)
                        }} value={listParam} defaultValue={listParams[0]} placeholder="Select a category" />
        
            </div>
            <div className="innerPostGrid">
            {purchaseHistory.filter((value) => {
                console.log("-------listParam is:", listParam)
                if (value.renter === authState.username){
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
                            <div className="Description">Item Description: {(value.itemDescription)}</div>
                            <div className="totalPrice">Total: ${Number(value.cost)}</div>
                            <div className="startDate">Start Date: {new Date(value.transactionBegin).toLocaleDateString()}</div>
                            <div className="endDate">End Date: {new Date(value.transactionEnd).toLocaleDateString()}</div>
                            {!value.itemLeftRenter &&
                                <button className='buyButton' onClick={() => writeReview(value.id)} >Write Review</button>
                            }
                            
                        </div>
                        
                    </div>

                );
            })}
            </div>
        </div>
    )
}

export default PurchaseHistory