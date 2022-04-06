import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import { AuthContext } from '../helpers/AuthContext';
import { hostname } from '../App.js'
function Post() {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { authState } = useContext(AuthContext);

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

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className="post" id='individual'>
                    <div className='title'>
                        {postObject.title}
                    </div>
                    <div className='body'>
                        {postObject.postText}
                    </div>
                    <div className='rentType'>
                        {postObject.category}
                    </div>
                    <div className='footer'>
                        {postObject.username}
                    </div>

                </div>
                <div className='body'>
                    {postObject.postText}
                </div>
                <div className='rentType'>
                    Category: {postObject.category}
                </div>

                <div className='footer'>
                    {postObject.username}
                </div>

            </div>

            <div className='rightSide'>
                <div className='postBuyButtons'>
                    <button>Add to Cart</button>
                    <button>Buy Now</button>
                </div>
                <div className="postInfo">
                    <div className="otherInfo">
                        <div className="postCategory">
                            Category: {postObject.category}
                        </div>
                        <div className='depositFee'>
                            Deposit Fee: {postObject.depositFee}
                        </div>
                        <div className='shippingFee'>
                            Shipping Fee: {postObject.shippingFee}
                        </div>
                        <div className='pricePerDay'>
                            $/Day: {postObject.pricePerDay}
                        </div>
                    </div>

                    <div className="postDescription">
                        Description: {postObject.postText}
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
                                </label>

                                {comment.commentBody}
                                {authState.username === comment.username && <button onClick={() => { deleteComment(comment.id) }}> X </button>}
                            </div>);
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post
