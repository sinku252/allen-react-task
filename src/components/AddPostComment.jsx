import React, { useState } from 'react'
import {  useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import PostService from '../services/PostService';


const AddPostComment = () => {
    const { id } = useParams()

    const [postComment, setPostComment] = React.useState({name: '', body: ''});
    const navigate = useNavigate();

   
    React.useEffect(() => {
       console.log(id)

    }, []);

    const addComment = (e) => {
        e.preventDefault();
        let postCommentJson = {"post":id,"name":postComment.name,"email":"test@text.com","body":postComment.body}
       /*   let postJson = {"post":"1547","name":"my comment","email":"test@text.com","body":"my new comment body"};
        console.log('user => ' + JSON.stringify(post)); */

        PostService.createComment(postCommentJson,id).then(res => {
            navigate(-1)
        });
    }

    
    const cancel = () => {
        navigate(-1)
    }

    const postTitle = (value) => {
        setPostComment({
            name: value,
            body: postComment.body
        });
    }

    const postBody = (value) => {
        setPostComment({
            name:postComment.name,
            body:value
        });
    }

    const getTitle = () => {
        return <h3 className="text-center">Create Post Comments</h3>
    }

    if (!setPostComment) return null;

    return (
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