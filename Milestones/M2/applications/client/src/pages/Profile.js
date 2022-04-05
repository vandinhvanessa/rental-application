import React, { useEffect , useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';


function Profile() {
    let { id } = useParams("");
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryTerm, setCategory] = useState('');
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
      {" "}
        <h1>Username: {username}</h1>
      </div>
      <div className="listOfPosts">
      <input className="SearchBar" type="text" placeholder="Search..." onChange={event => { setSearchTerm(event.target.value) }} />
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
            <div className="title"> {value.title} </div>
            <div className="body"> {value.postText} </div>
            <div className="rentType"> {value.category} </div>
            <div className="footer"> {value.username}
              
              <button className='buyButton' type='submit'>Buy Now</button>
              
            </div>

          </div>
        );
      })}
      </div>
    </div>
  )
}

export default Profile
