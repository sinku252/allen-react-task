import React, { useState } from 'react'
import {  useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import PostService from '../services/PostService';
import LoadingSpinner from "../common/LoadingSpinner";

const CreatePostComponent = () => {
    const { id } = useParams()

    const [post, setPost] = React.useState({title: '', body: ''});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
   
    React.useEffect(() => {
       

    }, []);

    const savePost = (e) => {
        setIsLoading(true)
        e.preventDefault();
       /*   let postJson = {title: post.title, body: post.postBody};
        console.log('user => ' + JSON.stringify(post)); */

        PostService.createPost(post,id).then(res => {
            navigate(-1)
            setIsLoading(false)
        });
    }

    
    const cancel = () => {
        navigate(-1)
    }

    const postTitle = (value) => {
        setPost({
            title: value,
            body: post.body
        });
    }

    const postBody = (value) => {
        setPost({
            title:post.title,
            body:value
        });
    }

    const getTitle = () => {
        return <h3 className="text-center">Create User Post</h3>
    }

    if (!post) return null;

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
                                    <label> Post Title: </label>
                                    <input placeholder="Post Title" name="postTitle" className="form-control"
                                        value={post.name} onChange={e => postTitle(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label> Post Body: </label>
                                    <input placeholder="Post Body" name="postBody" className="form-control"
                                        value={post.email} onChange={ e =>postBody(e.target.value)} />
                                </div>

                                <div style={{marginTop: "10px"}}>
                                <button className="btn btn-success" onClick={savePost}>Create Post</button>
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

export default CreatePostComponent