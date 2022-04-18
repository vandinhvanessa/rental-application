import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import listOfPosts from './pages/Home'
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Cart from './pages/Cart'
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Profile from './pages/Profile';
import CartContext from './pages/User/Cart';
import rentLogo from './helpers/renttomelogo.png';

//export const hostname = "rentto.me:3001";
export const hostname = "localhost:3001";

function App() {

  // const {products} = listOfPosts;


  const [cart, setCart] = useState([]);

  // const onAdd = (product) => {
  //   const exist = cartItems.find(x => x.id === product.id);
  //   if (exist) {
  //     setCartItems(cartItems.map(x => x.id === product.id ? {...exist, qty: exist.qty + 1} : x))
  //   }
  //   else {
  //     setCartItems([...cartItems, {...products, qty: 1}])
  //   }
  // }

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios.get('http://' + hostname + '/auth/auth', {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      }
    })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false })
        }
        else {
          setAuthState(
            {
              username: response.data.username,
              id: response.data.id,
              status: true,
            });
        }
      });

  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };


  return (

    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <Router>
            <div className="rentLogo">
              <a href="/">
                <img src={rentLogo}></img>
              </a>
            </div>
            {!authState.status ? (
              <div className="navbar">
                <Link to="/"> Home Page</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/login"> Login</Link>
                <Link to="/registration"> Registration</Link>
              </div>
            ) : (

              <div className="navbar">
                <Link to="/"> Home Page</Link>
                <Link to="/createpost"> Create A Post</Link>
                <Link to="/cart">Cart</Link>
                <div className="dropdown">
                  <button className="dropbtn">{authState.username}</button>
                  <div className="dropdown-content">
                    <Link to={`/profile/${authState.id}`}>Profile</Link>
                    <p>Reviews</p>
                    <p>Purchase History</p>
                    <p>View History</p>
                    <p>Settings</p>
                  </div>
                </div>


                <button onClick={logout}> Logout</button>
              </div>
            )}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createpost" element={<CreatePost />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile/:id" exact element={<Profile />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Router>
        </CartContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
