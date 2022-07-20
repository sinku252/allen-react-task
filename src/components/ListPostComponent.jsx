import React from 'react';
import { useNavigate } from "react-router-dom";
import PostService from '../services/PostService'
import {  useParams } from 'react-router-dom'

const ListPostComponent = () => {
    const { id } = useParams()

    const [posts, setPosts] = React.useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
   

    React.useEffect(() => {
        setIsLoading(true)
        PostService.getPostList(id).then((res) => {
            setPosts(res.data);
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            alert(err);
        });

    }, []);

    if (!posts) return null;

    const addComment = (post) => {
        navigate(`/add-post-comment/${post.id}`);
    }
    const viewComments = (postId) => {
        navigate(`/view-post-comments/${postId}`);
    }
    const createPost = () =>{
      
        navigate(`/create-post/${id}`);
    }
   
    return (
        isLoading ? <LoadingSpinner /> :
        <div>
            <h2 className="text-center">Posts List</h2>
            <div className = "row">
                <button className="btn btn-primary" onClick={createPost}> Add Post</button>
             </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">

                    <thead>
                        <tr>
                            <th> Post Title</th>
                            <th> Post Body</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map(
                                post =>
                                    <tr key={post.id}>
                                        <td> {post.title} </td>
                                        <td> {post.body}</td>
                                        <td>
                                            <button onClick={() => addComment(post)} className="btn btn-info">Add Comments </button>
                                            <br></br>
                                            <button style={{ marginTop: "10px" }} onClick={() => viewComments(post.id)} className="btn btn-info">View Comments</button>
                                        </td>
                                    </tr>
                            )

                        }
                    </tbody>
                </table>

            </div>

        </div>
    );
}

export default ListPostComponent;
