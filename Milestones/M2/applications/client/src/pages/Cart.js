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
    let localCart = localStorage.getItem("cart");
    // console.log(cart)

    const removeFromCart = (productToDelete) => {
        console.log("removed from cart")
        const newCart = cart.filter((product) => product.id !== productToDelete.id);        
        setCart(newCart);
        let stringCart = JSON.stringify(newCart);
        localStorage.setItem("cart", stringCart)
    }
    const completeTransaction = (productPost) => {
        let stringPost = JSON.stringify(productPost)
        localStorage.setItem("transactionPost", stringPost)
        console.log("transaction started")
        console.log("Testing response")
        // console.log(productToPurchase)
        axios.post("http://" + hostname + "/transactions", productPost, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }).then((response) => {
            // redirect to homepage
            setTransaction(response)
            
            navigate('/transactions', { replace: true });
          }).catch((err)=> {
              console.log("error: " + err)
          });
          
        // after completing transaction remove item from cart
        // const newCart = cart.filter((product) => product.id !== stringPost.id);        
        // setCart(newCart);
    }

    useEffect(() => {
        // console.log(typeof JSON.parse(localCart))
        localCart = JSON.parse(localCart);
        if (localCart) setCart( localCart)

    }, []) // empty array ensure useEffect only runs once
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
                            <div className="startDate">Start Date: {new Date(value.startDate).toLocaleDateString()}</div>
                            <div className="endDate">End Date: {new Date(value.endDate).toLocaleDateString()}</div>
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