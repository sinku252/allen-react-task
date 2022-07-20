import React, { useState } from 'react'
import {  useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import PostService from '../services/PostService';
import LoadingSpinner from "../common/LoadingSpinner";

const AddPostComment = () => {
    const { id } = useParams()

    const [postComment, setPostComment] = React.useState({name: '', body: ''});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);

   
    React.useEffect(() => {
       console.log(id)

    }, []);

    const addComment = (e) => {
        setIsLoading(true)
        e.preventDefault();
        let postCommentJson = {"post":id,"name":postComment.name,"email":localStorage.getItem('userEmail'),"body":postComment.body}
        PostService.createComment(postCommentJson,id).then(res => {
            setIsLoading(false)
            navigate(-1)
            
        }).catch(err => {
            setIsLoading(false)
            alert(err);
        });
    }

    
    const cancel = () => {
        navigate(-1)
    }

    const postTitle = (value) => {
        setPostComment({...postComment, name: value})
    }

    const postBody = (value) => {
        setPostComment({...postComment, body: value})
    }

    const getTitle = () => {
        return <h3 className="text-center">Create Post Comments</h3>
    }

    if (!setPostComment) return null;

    return (
        isLoading ? <LoadingSpinner /> :
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                           getTitle
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Comment Name: </label>
                                    <input placeholder="Comment Name" name="commentName" className="form-control"
                                        value={postComment.name} onChange={e => postTitle(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label> Comment Body: </label>
                                    <input placeholder="Comment Body" name="commentBody" className="form-control"
                                        value={postComment.body} onChange={ e =>postBody(e.target.value)} />
                                </div>

                                <div style={{marginTop: "10px"}}>
                                <button className="btn btn-success" onClick={addComment}>Add Comment</button>
                                <button className="btn btn-danger" onClick={cancel.bind()} style={{ marginLeft: "10px" }}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default AddPostComment