import React from 'react';
import { useNavigate } from "react-router-dom";
import PostService from '../services/PostService'
import {  useParams } from 'react-router-dom'
import LoadingSpinner from "../common/LoadingSpinner";

const ListPostComment = () => {
    const { id } = useParams()

    const [comments, setComments] = React.useState(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);

   

    React.useEffect(() => {
         setIsLoading(true)
        PostService.getCommentList(id).then((res) => {
            setComments(res.data);
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            alert(err);
        });

    }, []);

    if (!comments) return null;

   
    return (
        isLoading ? <LoadingSpinner /> :
        <div>
            <h2 className="text-center">Post Comment List</h2>
            
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">
``
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th> Email</th>
                            <th> Comment Body</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        {
                            comments.map(
                                comment =>
                                    <tr key={comment.id}>
                                        <td> {comment.name} </td>
                                        <td> {comment.email}</td>
                                        <td> {comment.body}</td>

                                       {/*  <td>
                                            <button onClick={() => addComment(post)} className="btn btn-info">Add Comments </button>
                                            <br></br>
                                            <button style={{ marginTop: "10px" }} onClick={() => viewComments(post.id)} className="btn btn-info">View Comments</button>
                                        </td> */}
                                    </tr>
                            )

                        }
                    </tbody>
                </table>

            </div>

        </div>
    );
}

export default ListPostComment;
