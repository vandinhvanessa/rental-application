import { createContext } from 'react';
import React from 'react';

//global object that can be accessed
//for adding to cart, a list of posts
//doesnt insert into Cart database table
const CartContext = createContext();
export default CartContext;