import React, { useEffect , useState, useContext } from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { hostname } from '../App.js';
import Select from 'react-select';
import CartContext from './User/Cart';
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
    
    const onSubmit = (transactionId) => {
      axios.put("https://" + hostname +  "/transactions/:" + transactionId
      , {active: 1}).then((response) => {
      })
        // navigate('/', { replace: true });
        console.log(transactionId)
       
    
      };
      const initialValues = {
        postID: "",
        itemDescription: "",
        lender: "",
        renter: "",
        transactionBegin: "",
        transactionEnd: "",
        active: "",
        cost: ""
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