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
import { AuthContext } from "../helpers/AuthContext";


function Inventory() {
    let navigate = useNavigate();
    const {authState} = useContext(AuthContext)
    const [inventory, setInventory] = useState([])
  

    useEffect(() => {
        // get inventory
        console.log(authState.username)
        axios.get(`http://${hostname}/inventory/byLender/${authState.username}`)
        .then(async (response) => {
            console.log(response)
            setInventory(response.data)
            // setListParam("All")
        })
        
        
    }, [])
  return (
      <div>
          {inventory.map((value, key) => {
        return (
          <div className="listing">
            <div className="listingLeft">
              <Image
                className="postImage"
                style={{ width: 450 }}
                cloudName="ditub0apw"
                publicId={value.image}
                
              />
            </div>
          </div>
        );
      })}
      </div>
    
  );
}

export default Inventory;
