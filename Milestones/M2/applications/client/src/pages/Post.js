import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';
import { hostname } from '../App.js';
import { Image } from 'cloudinary-react'
import CartContext from './User/Cart';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [subTotal, setSubtotal] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { authState } = useContext(AuthContext);
    const {cart, setCart} = useContext(CartContext)
    const addToCart = (product) => {
        product.startDate = startDate;
        product.endDate = endDate;
        product.subTotal = postObject.pricePerDay * Math.abs(endDate - startDate)/(1000*60*60*24);
        setSubtotal(product.subTotal)
        setCart([...cart, product]);
        console.log(startDate)
        console.log(endDate)
        console.log(product.subTotal)
    }
    //let history = useNavigate();

    useEffect(() => {
        axios.get(`http://` + hostname + `/posts/byId/${id}`).then((response) => {
            setPostObject(response.data);
        });
        axios.get(`http://` + hostname + `/comments/${id}`).then((response) => {
            setComments(response.data);
        });
    }, []);
    
    const addComment = (() => {
        axios
            .post("http://" + hostname + "/comments", { commentBody: newComment, PostId: id },
                {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }
            )
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    const commentToAdd = { commentBody: newComment, username: response.data.username }
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }

            })
    });

    const deleteComment = (id) => {
        axios.delete(`http://` + hostname + `/comments/${id}`, {
            headers: { accessToken: localStorage.getItem('accessToken') },
        }).then(() => {
            setComments(
                comments.filter((val) => {
                    return val.id != id;
                })
            );
        });
    };

    // const calculateSubtotal = (postObject) => {
    //     postObject.subTotal = postObject.pricePerDay * Math.abs(endDate - startDate)/(1000*60*60*24)
    // }
    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className="post" id='individual'>
                    <div className='title'>
                        {postObject.title}
                    </div>
                    <div className='body'>

                        <Image
                            className="postImage"
                            style={{ width: 500 }}
                            cloudName="ditub0apw"
                            publicId={postObject.image}
                        />
                    </div>


                    <div className='footer'>
                        {postObject.username}
                    </div>

                </div>

            </div>

            <div className='rightSide'>

                <div className="postInfo">
                    <div className='postBuyButtons'>
                        <button className='buyButton' onClick={() => addToCart(postObject)} >Add To Cart</button>
                        <button>Buy Now</button>
                    </div>
                    <DatePicker
                        selected={startDate}
                        selectsStart
                        startDate = {startDate}
                        endDate={endDate} // add the endDate to your startDate picker now that it is defined
                        onChange={date=>setStartDate(date)}            
                    />
                    <DatePicker
                        selected={endDate}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        onChange={date=>setEndDate(date)}
                         // tells Datepicker that it is part of a range*
                    />
                    <div className="otherInfo">
                        <div className="postCategory">
                            Category: {postObject.category}
                        </div>
                        <div className='depositFee'>
                            Deposit Fee: ${postObject.depositFee}
                        </div>
                        <div className='shippingFee'>
                            Shipping Fee: ${postObject.shippingFee}
                        </div>
                        <div className='pricePerDay'>
                            $/Day: ${postObject.pricePerDay}
                        </div>
                        <div className='subTotal'>
                            Subtotal: {postObject.pricePerDay * Math.abs(endDate - startDate)/(1000*60*60*24)}
                        </div>
                    </div>

                    <div className="postDescription">
                        Description:
                    </div>
                    <div className="postDescription">
                        {postObject.postText}
                    </div>
                </div>


                <div className="addCommentContainer">
                    <input
                        type="text"
                        placeholder="Comment..."
                        autoComplete="off"
                        value={newComment}
                        onChange={(event) => { setNewComment(event.target.value) }}
                    />
                    <button onClick={addComment}>
                        Add Comment
                    </button>
                </div>
                <div className="listOfComments">
                    {comments.map((comment, key) => {
                        return (
                            <div key={key} className="comment">

                                <label>
                                    Username: {comment.username}
                                    {authState.username === comment.username && <button className="commentDelete" onClick={() => { deleteComment(comment.id) }}> X </button>}
                                </label>
                                
                                <div className="commentBody">
                                    {comment.commentBody}
                                </div>


                            </div>);
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post
