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

function AddToInventory() {
    let navigate = useNavigate();
    const [imageSelected, setImageSelected] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [inventory, setInventory] = useState([])
    const {authState} = useContext(AuthContext)
    let localInventory = localStorage.getItem("inventory")
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
    const initialValues = {
        itemName: "",
        username: "",
        category: "",
        image: ""
      };
    //   const validationSchema = Yup.object().shape({
    //     itemName: Yup.string().required(),
    //     category: Yup.string().required(),
    //     image: Yup.image().required(),
    //   });
      useEffect(() => {
        if (localInventory){
          console.log(typeof localInventory)
          setInventory(JSON.parse(localInventory))
        } else{
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
      
      const onSubmit = (data) => {
        data.image = imageLink
        // console.log(data)
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
          navigate('/', { replace: true });
        })
        
        
    
      };
  return (
    <div className="createPostPage" class="btn-group">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        >
        <Form className="formContainer">
          <label>Item Name: </label>
          <ErrorMessage name="itemName" component="span" />
          <Field
            id="inputCreatePost"
            name="itemName"
            placeholder="(Ex....Greenbilt Hammer)"
          />

          <label>Category: </label>
          <ErrorMessage name="category" component="span" />

          <Field
            id="inputCreatePost"
            name="category"
            as="Select"
          >
            <option value="" selected disabled>Please Select</option>
            <option value="All">All</option>
            <option value="Bicycle Gear">Bicycle Gear</option>
            <option value="Climbing Gear">Climbing Gear</option>
            <option value="Electronics">Electronics</option>
            <option value="Garden">Garden</option>
            <option value="Hiking Gear">Hiking Gear</option>
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
          <button type="submit">
            Add Item to Inventory
          </button>
          {/* <Image cloudName="ditub0apw"
            style={width: 200;}
            publicId = ""
            /> */}
        </Form>
      </Formik>
    </div>
  );
}

export default AddToInventory;
