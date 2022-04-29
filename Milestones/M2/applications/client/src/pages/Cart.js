import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { hostname } from '../App.js';
import { Image } from 'cloudinary-react'
import CartContext from './User/Cart';
import TransactionContext from './User/Transaction';


function Cart() {
    let navigate = useNavigate();
    const { cart, setCart } = useContext(CartContext)
    const { transaction, setTransaction } = useContext(TransactionContext)
    // console.log(cart)
    const removeFromCart = (productToDelete) => {
        console.log("removed from cart")
        const newCart = cart.filter((product) => product.id !== productToDelete.id);        
        setCart(newCart);
    }
    const completeTransaction = (productPost) => {
        console.log("transaction started")
        // console.log(productToPurchase)
        axios.post("http://" + hostname + "/transactions", productPost, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }).then((response) => {
            // redirect to homepage
            setTransaction(response)
            // console.log(response)
            navigate('/transactions', { replace: true });
          });
        // after completing transaction remove item from cart
        // const newCart = cart.filter((product) => product.id !== productToPurchase.id);        
        // setCart(newCart);
    }
    /*useEffect(() => {
        axios.get("http://" + hostname + "/cart").then((response) => {
            console.log("-----response.data in Cart.js: ", response.data)
            setCart(response.data);
        })
    }, []);*/
    
    return (
        <div>
            {cart.map((value, key) => {
                return (
                    <div className="listing">
                        <div className="listingLeft">
                            <Image
                                className="postImage"
                                style={{ width: 450 }}
                                cloudName="ditub0apw"
                                publicId={value.image}
                                onClick={() => {
                                    navigate(`/post/${value.id}`, { replace: true })
                                }}
                            />
                        </div>
                        <div className="listingRight">
                            <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
                            <div className="depositFee">Deposit Fee: ${value.depositFee}</div>
                            <div className="shippingFee">Shipping Fee: ${value.shippingFee}</div>
                            <div className="pricePerDay">$/Day: ${value.pricePerDay}</div>
                            <div className="subTotal">Subtotal: ${value.subTotal}</div>
                            <div className="totalPrice">Total: ${Number(value.subTotal)+Number(value.depositFee)+Number(value.shippingFee)}</div>
                            <div className="startDate">Start Date: {value.startDate.toLocaleDateString()}</div>
                            <div className="endDate">End Date: {value.endDate.toLocaleDateString()}</div>
                            <button className='buyButton' onClick={() => completeTransaction(value)} >Complete Transaction</button>
                            <button className='buyButton' onClick={() => removeFromCart(value)} >Remove from Cart</button>
                        </div>
                        
                    </div>

                );
            })}
        </div>

    )
}

export default Cart