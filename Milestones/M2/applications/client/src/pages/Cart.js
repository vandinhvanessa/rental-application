import React, {useEffect , useState, useContext} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { hostname } from '../App.js';
import { Image } from 'cloudinary-react'
import CartContext from './User/Cart';


function Cart(){
    let navigate = useNavigate();
    const {cart, setCart} = useContext(CartContext)
    // console.log(cart)
    const removeFromCart = (productToDelete) => {
        console.log("removed from cart")
        const newCart = cart.filter((product) => product.id !== productToDelete.id);        
        setCart(newCart);
      }
    return(
        <div>
            {cart.map((value, key) => {
        return (
          <div className="post" key ={value.id}>
            <div className="title" onClick={() => {
              navigate(`/post/${value.id}`, { replace: true })
            }}> {value.title} </div>
            <div className="body" onClick={() => {
              navigate(`/post/${value.id}`, { replace: true })
            }}> 
              {value.postText} 
            </div>
            <Image
              style = {{width: 200}}
              cloudName = "ditub0apw"
              publicId = {value.image}
              />
            <div className="rentType"> {value.category} </div>

            <div className="footer"> 
              <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              <div className="depositFee">Deposit Fee: {value.depositFee}</div>
              <div className="shippingFee">Shipping Fee: {value.shippingFee}</div>
              <div className="pricePerDay">$/Day: {value.pricePerDay}</div>
              <button className='buyButton' onClick={() => removeFromCart(value)} >Remove from Cart</button>
              
            </div>
            
          </div>
          
        );
      })}
        </div>
        
    )
}

export default Cart