import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { hostname } from '../App.js'
function Registration() {
  let history = useNavigate();
  const initialValues = {
    username: "",
    password: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(20).required(),
    password: Yup.string().min(4).max(20).required(),
    email: Yup.string().max(30).required(),
    address: Yup.string().max(20).required(),
    city: Yup.string().max(20).required(),
    state: Yup.string().max(15).required(),
    zipCode: Yup.string().max(10).required(),
    country: Yup.string().max(15).required(),
  });
  const onSubmit = (data) => {
    axios.post("http://" + hostname + "/auth", data).then(() => {
      console.log(data);
      history('/login', {replace: true});
    })
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="(Ex....John123)"
          />
          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            id="inputCreatePost"
            type="password"
            name="password"
            placeholder="Your Password..."
          />
          <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            id="inputCreatePost"
            
            name="email"
            placeholder="Your Email..."
          />
          <label>Street Address: </label>
          <ErrorMessage name="address" component="span" />
          <Field
            id="inputCreatePost"
            
            name="address"
            placeholder="Your Street Address..."
          />
          <label>City: </label>
          <ErrorMessage name="city" component="span" />
          <Field
            id="inputCreatePost"
            
            name="city"
            placeholder="Your City..."
          />
          <label>State: </label>
          <ErrorMessage name="state" component="span" />
          <Field
            id="inputCreatePost"
            
            name="state"
            placeholder="Your State..."
          />
          <label>Zipcode: </label>
          <ErrorMessage name="zipCode" component="span" />
          <Field
            id="inputCreatePost"
            
            name="zipCode"
            placeholder="Your Zipcode..."
          />
          <label>Country: </label>
          <ErrorMessage name="country" component="span" />
          <Field
            id="inputCreatePost"
            
            name="country"
            placeholder="Your Country..."
          />
          <button type="submit">
            Register
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration
