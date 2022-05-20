import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { Image } from 'cloudinary-react';
function Profile() {
  let { id } = useParams("");
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryTerm, setCategory] = useState('');
  const categories = [{ value: "All", label: "All" }, { value: "Bicycle Gear", label: "Bicycle Gear" },
  { value: "Climbing Gear", label: "Climbing Gear" }, { value: "Electronics", label: "Electronics" }, { value: "Garden", label: "Garden" },
  { value: "Hiking Gear", label: "Hiking Gear" }, { value: "Home", label: "Home" }, { value: "Industrial", label: "Industrial" },
  { value: "Outdoors", label: "Outdoors" }, { value: "Pet Supplies", label: "Pet Supplies" }, { value: "Scientific", label: "Scientific" },
  { value: "Silverware", label: "Silverware" }, { value: "Snow Gear", label: "Snow Gear" }, { value: "Tools", label: "Tools" },
  { value: "Toys", label: "Toys" }, { value: "Other", label: "Other" }];
  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username)
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data)
    })
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicinfo">
        <h1 className='usernameDisplay'>Username: {username}</h1>
      </div>
      <div className='filters'>
        <input className="SearchBar" type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} />
        <Select options={categories} onChange={event => setCategory(event.value)} value={categoryTerm} placeholder="Select a category" />
      </div>
      <div className='posts'>
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
            <div className="post" onClick={() => {
              navigate(`/post/${value.id}`, { replace: true })
            }}>
              {/* <div className="userTitle">Title: {value.title} </div>
            <Image
              className="postImage"
              style={{ width: 450 }}
              cloudName="ditub0apw"
              publicId={value.image}
              onClick={() => {
                navigate(`/post/${value.id}`, { replace: true })
              }}
            />
            <div className="body"> {value.postText} </div>
            <div className="userRentType">Category: {value.category} </div>

            <div className="footer">
            <div className="userDepositFee">Deposit Fee: {value.depositFee}</div>
            <div className="userShippingFee">Shipping Fee: {value.shippingFee}</div>
            <div className="userPricePerDay">$/Day: {value.pricePerDay}</div>
            </div>
            
            <button className='editButton' type='submit'>Edit</button>
            <button className='removeButton' type='submit'>Remove</button> */}
              <div className="title" onClick={() => {
                navigate(`/post/${value.id}`, { replace: true })
              }}> {value.title}  </div>

              <Image
                className="postImage"
                style={{ width: 450 }}
                cloudName="ditub0apw"
                publicId={value.image}
                onClick={() => {
                  navigate(`/post/${value.id}`, { replace: true })
                }}
              />

              <div className="footer">
                <div>Category: {value.category}</div>
                <div className="depositFee">Deposit Fee: {value.depositFee}</div>
                <div className="shippingFee">Shipping Fee: {value.shippingFee}</div>
                <div className="pricePerDay">$/Day: {value.pricePerDay}</div>
                {/* <button className='buyButton' onClick={() => addToCart(value)} >Add To Cart</button> */}
                <button className='editButton' type='submit'>Edit</button>
                <button className='removeButton' type='submit'>Remove</button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Profile
