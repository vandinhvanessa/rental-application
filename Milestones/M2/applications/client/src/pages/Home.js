import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
//import { DropDownList } from "@progress/kendo-react-dropdowns";
import '@progress/kendo-theme-default/dist/all.css';
import { hostname } from '../App.js'
import {Image} from 'cloudinary-react'
import Select from 'react-select';


const categories = [{ value: "All", label: "All" }, { value: "Tools", label: "Tools" }, { value: "Hiking Gear", label: "Hiking Gear" },
{ value: "Bicycle Gear", label: "Bicycle Gear" }, { value: "Snow Gear", label: "Snow Gear" },
{ value: "Climbing Gear", label: "Climbing Gear" }, { value: "Silverware", label: "Silverware" }, { value: "Other", label: "Other" }];
function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryTerm, setCategory] = useState('');
  
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login", {replace: true});
    } else {
    axios.get("http://" + hostname + "/posts", {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then((response) => {
      setListOfPosts(response.data);
    });
  }
  }, []);
  //console.log(listOfPosts);
  return (
    <div className="App">
      <input className="SearchBar" type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} />
      {/*<DropDownList className="Dropdown" data={categories} onChange={event => setCategory(event.value)} />*/}
      <Select options={categories} onChange={event => setCategory(event.value)} value={categoryTerm} placeholder="Select a category" />
      {listOfPosts.filter((value) => {
        if (searchTerm == "" && categoryTerm == "") {
          return value;
        } else if (value.title.toLowerCase().includes(searchTerm.toLowerCase()) && categoryTerm == "") {
          return value;
        } else if (value.title.toLowerCase().includes(searchTerm.toLowerCase()) && value.category.toLowerCase().includes(categoryTerm.toLowerCase())) {
          return value;
        }
        else if (searchTerm == "" && value.category.toLowerCase().includes(categoryTerm.toLowerCase())) {
          return value;
        }
        else if (value.title.toLowerCase().includes(searchTerm.toLowerCase()) && categoryTerm == "All") {
          return value;
        }
      }).map((value, key) => {
        return (
          <div className="post" >
            <div className="title" onClick={() => {
              navigate(`/post/${value.id}`, { replace: true })
            }}> {value.title} </div>
           
            <Image
              className="postImage"
              style = {{width: 450}}
              cloudName = "ditub0apw"
              publicId = {value.image}
              onClick={() => {
                navigate(`/post/${value.id}`, { replace: true })
              }}
              />
            

            <div className="footer"> 
              <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              <div className="depositFee">Deposit Fee: {value.depositFee}</div>
              <div className="shippingFee">Shipping Fee: {value.shippingFee}</div>
              <div className="pricePerDay">$/Day: {value.pricePerDay}</div>
              <button className='buyButton' type='submit'>Buy Now</button>
              
            </div>
            
          </div>
        );
      })}
    </div>
  )
}

export default Home
