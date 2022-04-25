import React, { useEffect , useState, useContext } from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { hostname } from '../App.js';
import Select from 'react-select';
import CartContext from './User/Cart';
import { Formik, Form, Field, ErrorMessage } from 'formik'

function Checkout(product){
    let navigate = useNavigate();
    const onSubmit = (product) => {
        
        // console.log(data)
       
    
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
              <label>Checkout: </label>
              <ErrorMessage name="title" component="span" />
              <Field
                id="inputCreatePost"
                name="title"
                placeholder="Checkout page..."
              />
            </Form>
          </Formik>
        </div>
      )
}

export default Checkout