import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
//import { DropDownList } from "@progress/kendo-react-dropdowns";
import '@progress/kendo-theme-default/dist/all.css';
import { hostname } from '../App.js'


const categories = ["All", "Tools", "Hiking Gear", "Bicycle Gear", "Snow Gear", "Climbing Gear", "Silverware", "Other"];
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
            <div className="body" onClick={() => {
              navigate(`/post/${value.id}`, { replace: true })
            }}> 
              {value.postText} 
            </div>
            <div className="rentType"> {value.category} </div>
            <div className="footer"> 
              <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
              
              <button className='buyButton' type='submit'>Buy Now</button>
              
            </div>

          </div>
        );
      })}
    </div>
  )
}

export default Home
