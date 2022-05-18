import React, { useEffect , useState, useContext } from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { hostname } from '../App.js';
import Select from 'react-select';
import CartContext from './User/Cart';
import TransactionContext from './User/Transaction';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import SelectUSState from 'react-select-us-states';



function Transaction(){
  
    let navigate = useNavigate();
    // const fillShipping = (f) =>  {
    //   if (f.shippingtoo.checked === true) {
    //     f.shipping.value = f.billing.value;
    //   }
    //   if (f.shippingtoo.checked === false) {
    //     f.shipping.value = '';
    //   }
    // }


    // need to access id value from transaction
    const { transaction } = useContext(TransactionContext)
    const { cart, setCart } = useContext(CartContext)
    const [ postID, setPostID ] = useState("")
    let transactionPost = localStorage.getItem("transactionPost");
    let localCart = localStorage.getItem("cart")
    //resets cart list to not include the specified product
    const removeFromCart = (postID) => {
 
      console.log("removed from cart")
      let newCart = cart.filter((post) => post.id !== postID);       
      console.log(newCart)
      setCart(newCart);
      let stringCart = JSON.stringify(newCart);
      localStorage.setItem("cart", stringCart)
    }
    // const hidePost = (postIdObject) => {
    //   const postID = postIdObject.data[0].postID
    //   console.log("item hidden from homepage")
    //   // console.log(postID)
      
    // }

    //gets the cart list
    useEffect(() => {
      // console.log(typeof JSON.parse(localCart))
      localCart = JSON.parse(localCart);
      if (localCart) setCart( localCart)

    }, [])
    
    const onSubmit = () => {
      const transactionID = transaction.data[0]
      // If we can extract transactions id from transaction object this should pass
      // transaction id to transaction/:transactionId route
      console.log("transactionID: " + transactionID)
      //sends transaction data to route to set complete transaction flag
      axios.post(`http://${hostname}/transactions/byId/${transactionID}`, 
      transactionID,
      {
        headers: {
            accessToken: localStorage.getItem("accessToken")
        }
      }// response is postID
      ).then(() => {
        //removes the product from the cart
        removeFromCart(JSON.parse(transactionPost).id);
        
        // let postID = response.data[0].postID
        // setPostID(response.data[0].postID)
        
        // need to update post showpost column to 0
      })
      .then(
        //sends transaction data to route, to hide that post to no longer able to buy
        axios.post(`http://${hostname}/posts/byId/hide/${JSON.parse(transactionPost).id}`, {showPost: 0}, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        })
        )
      navigate('/', {replace: true})//redirects to home page
      window.location.reload(true);
      
      };
      const initialValues = {
        postID: "",
        itemDescription: "",
        lender: "",
        renter: "",
        transactionBegin: "",
        transactionEnd: "",
        paymentReceived: false,
        cost: "",
        image: ""
      };
      return (
        
        
        <div className="checkoutPage" class="btn-group">
          
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}>
            <Form className="formContainer">
              <label>Credit/Debit Card: </label>
              <ErrorMessage name="payment" component="span" />
              <Field
                id="inputCreatePost"
                name="payment"
                placeholder="####-###-####"
              />
              <label>Billing Address: </label>
              <ErrorMessage name="billing" component="span" />
              <Field
                id="inputCreatePost"
                name="billing"
                placeholder="123 E. Gatesford Lane"
              />
              <label>Zipcode: </label>
              <ErrorMessage name="zipcode" component="span" />
              <Field
                id="inputCreatePost"
                name="zipcode"
                placeholder="92013"
              />
              <label>State: </label>
              <ErrorMessage name="zipcode" component="span" />
              <SelectUSState id="state" className="myClassName" onChange="{this.setNewValue}"/>
              {/* <Field
                id="inputCreatePost"
                name="zipcode"
                placeholder="92013"
              /> */}
              <input type="checkbox" onClick="{fillShipping(this.form)}" name="shippingtoo"/>
              <em>Check this box if Billing Address and Shipping Address are the same.</em>
              <label>Shipping Address: </label>
              <ErrorMessage name="shipping" component="span" />
              <Field
                id="inputCreatePost"
                name="shipping"
                placeholder="123 E. Gatesford Lane"
              />
              <label>Zipcode: </label>
              <ErrorMessage name="zipcode" component="span" />
              <Field
                id="inputCreatePost"
                name="zipcode"
                placeholder="92013"
              />
              <label>State: </label>
              <ErrorMessage name="zipcode" component="span" />
              <SelectUSState id="state" className="myClassName" onChange="{this.setNewValue}"/>
              <button type="submit">
                Purchase
              </button>
            </Form>
            
          </Formik>
        </div>
      )
}

export default Transaction