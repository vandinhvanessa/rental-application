import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Home from './Home';
// import { DropDownList } from "@progress/kendo-react-dropdowns";
// import '@progress/kendo-theme-default/dist/all.css';  
import { useState, useEffect, useContext } from 'react';
import { hostname } from '../App.js';
import { Image } from 'cloudinary-react'
import { AuthContext } from '../helpers/AuthContext';

// const categories = ["all", "recipe", "video", "article"];
function CreatePost() {
  let history = useNavigate(); //TEMPORARY COMMENT OUT FOR TESTING
  const [imageSelected, setImageSelected] = useState("");//sets empty variable
  const [imageLink, setImageLink] = useState("");
  const [inventory, setInventory] = useState([])//sets empty list
  const {authState} = useContext(AuthContext)//login reference 
  const [itemID, setItemID] = useState("")
  let localInventory = localStorage.getItem("inventory")
  useEffect(() => {
    //if not logged in (accessToken), then redirects to login page
    if (!localStorage.getItem("accessToken")) {
      history("/login", { replace: true }); //TEMPORARY COMMENT OUT FOR TESTING
    }
    if (localInventory){//if inventory in localStorage exists then set inventory
      console.log(typeof localInventory)
      setInventory(JSON.parse(localInventory))
    } else{//sends a get request to retrieve data from inventory
      axios.get(`http://${hostname}/inventory/byLender/${authState.username}`)
        .then(async (response) => {
            console.log(response)
            setInventory(response.data)
            
            localStorage.setItem("inventory",JSON.stringify(response.data));
            // setListParam("All")
        }).then(console.log(inventory))
      }
    }
  ,[]);
  //once click Submit, sents input data to route to create a rental post
  //redirects to home page
  const onSubmit = (data) => {
    data.subTotal = 0;//subTotal is zero first because needs start and end date from user to calculate
    data.image = imageLink
    data.itemID = itemID
    // console.log(data)
    if (imageSelected) {
      axios.post(`http://${hostname}/inventory`, data, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }).then(() => {
          //setListOfPosts(response.data);
          // redirect to homepage
          axios.get(`http://${hostname}/inventory/byLender/${authState.username}`)
          .then(async (response) => {
            
            setInventory(response.data)
            
            localStorage.setItem("inventory",JSON.stringify(response.data));
            // setListParam("All")
          })
          .then(console.log("After adding",inventory))
          history('/', { replace: true });
        })
    }
    axios.post("http://" + hostname + "/posts", data, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      //setListOfPosts(response.data);
      // redirect to homepage
      console.log(response)
      history('/', { replace: true });// TEMPORARY COMMENT OUT FOR TESTING
    });

  };
  const initialValues = {
    title: "",
    postText: "",
    category: "",
    depositFee: "",
    shippingFee: "",
    pricePerDay: "",
    image: "",
    subTotal: "",
    showPost: "1",
    itemID: ""
  };
  //input requirements to create a rental post
  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
    category: Yup.string().required(),
    depositFee: Yup.number().required(),
    shippingFee: Yup.number().required(),
    pricePerDay: Yup.number().required(),
  });
  const [category, setCategory] = useState("");

  const uploadImage = () => {
    // Constructing the formData that we are passing to cloudinary
    const formData = new FormData()
    formData.append("file", imageSelected)
    // Passing the upload preset
    formData.append("upload_preset", "oqlvocmd")

    // Sending formData to route
    axios.post("https://api.cloudinary.com/v1_1/ditub0apw/image/upload"
      , formData).then((response) => {
        // console.log(response)
        console.log(response.data.public_id)
        setImageLink("https://res.cloudinary.com/ditub0apw/image/upload/v1649281497/" + response.data.public_id)
        // console.log(imageLink)
      })
  };
  return (
    <div className="createPostPage" class="btn-group" data-testid="create-post">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
        <Form className="formContainer" >
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="(Ex....Title)"
          />
          <label>Item Description: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex....Post)"
          />

          <label>Category: </label>
          <ErrorMessage name="category" component="span" />
          <Field
            id="inputCreatePost"
            name="category"
            as="Select" 
            data-testid="select"
          >
            <option value="" selected disabled>Please Select</option>
            <option value="All">All</option>
            <option value="Bicycle Gear">Bicycle Gear</option>
            <option value="Climbing Gear">Climbing Gear</option>
            <option value="Electronics">Electronics</option>
            <option value="Garden">Garden</option>
            <option data-testid="hiking" value="Hiking Gear">Hiking Gear</option>
            <option value="Home">Home</option>
            <option value="Industrial">Industrial</option>
            <option value="Outdoors">Outdoors</option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Scientific">Scientific</option>
            <option value="Silverware">Silverware</option>
            <option value="Snow Gear">Snow Gear</option>
            <option value="Tools">Tools</option>
            <option value="Toys">Toys</option>
            <option value="Other">Other</option>
          </Field>

          <label>Deposit Fee: $ </label>
          <ErrorMessage name="depositFee" component="span" />
          <Field
            id="inputCreatePost"
            name="depositFee"
            placeholder="$2..."
          />
          <label>Shipping Fee: $ </label>
          <ErrorMessage name="shippingFee" component="span" />
          <Field
            id="inputCreatePost"
            name="shippingFee"
            placeholder="$10..."
          />
          <label>Price Per Day: $/Day </label>
          <ErrorMessage name="pricePerDay" component="span" />
          <Field
            id="inputCreatePost"
            name="pricePerDay"
            placeholder="$2/day"
          />
          <ErrorMessage name="inventory" component="span" />
          <Field
            id="inputCreatePost"
            name="inventory"
            placeholder="My best hammer"
          />
          {inventory.map((value, key) => {
            return (
              <div className="listing">
                <div className="listingLeft">
                  <Image
                    className="postImage"
                    style={{ width: 450 }}
                    cloudName="ditub0apw"
                    publicId={value.image}
                    onClick={() => {setItemID(value.id)
                    setImageLink(value.image)
                  console.log(itemID)
                console.log(imageLink)}}
                  />
                </div>
              </div>
            );
          })}
          <input
            type="file"
            name="image"
            onChange={(event) => {
              setImageSelected(event.target.files[0]);
            }}
          />
          <button type="button" onClick={uploadImage}>
            Upload Image
          </button>
          {/* {imageSelected &&
            <Field
            id="inputCreatePost"
            name="itemName"
            placeholder="Honada lawnmower"
            />
          } */}
          <button type="submit">
            Create A Post
          </button>
          {/* <Image cloudName="ditub0apw"
            style={width: 200;}
            publicId = ""
            /> */}
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost
