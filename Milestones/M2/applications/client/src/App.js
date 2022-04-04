import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import {AuthContext} from './helpers/AuthContext';
import {useState, useEffect} from 'react';
import axios from 'axios';

export const hostname = "rentto.me:3001";
// export const hostname = "localhost:3001";
function App() {
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
      if(response.data.error){
        setAuthState({ ...authState, status: false })
      } 
      else {
        setAuthState(
         { username: response.data.username, 
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
      <AuthContext.Provider value={{authState, setAuthState}}>
      <Router>
      <div className="navbar">
        <Link to="/"> Home Page</Link>
        <Link to="/createpost"> Create A Post</Link>

        {!authState.status ? (
          <>
          <Link to="/login"> Login</Link>
          <Link to="/registration"> Registration</Link>
          </>
        ) : (
          <button onClick={logout}> Logout</button>
        )}
        <h1 className="usernameLogin">{authState.username}</h1>
        <h2 className="rentLogo"> Rentto.me </h2>
      </div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<Post/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
