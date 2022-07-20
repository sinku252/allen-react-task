import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserService from '../services/UserService'
import LoadingSpinner from "../common/LoadingSpinner";

const ListUserComponent = () => {
    const [users, setUsers] = useState([{}]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    const [loadingText, setLoadingText] = useState("Load More");

    const navigate = useNavigate();

    const viewUser= (id) =>{
        navigate(`/view-user/${id}`);
    }
    const editUser= (id) =>{
        navigate(`/add-user/${id}`);
    }
   
    React.useEffect(() => {
        setIsLoading(true)
        UserService.getUserList(page).then((res) => {
            setUsers(res.data);
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            alert(err);
        });

    }, []);
    
      if (!users) return null;

    const addUser = () =>{
        navigate('/add-user/_add');
    }
    const posts= (user) =>{
        localStorage.setItem('userEmail', user.email);
        navigate(`/user-posts/${user.id}`);
    }

    const loadMore = () =>{
        setPage((prevCount) => prevCount + 1);
        UserService.getUserList(page).then((res) => {
            res.data.map(user => (  
                setUsers(users => [...users, user])
              ))
              setIsLoading(false)
        });
    }

     return (
        isLoading ? <LoadingSpinner /> :
        <div>
             <h2 className="text-center">Users List</h2>
             <div className = "row">
                <button className="btn btn-primary" onClick={addUser}> Add User</button>
             </div>
             <br></br>
             <div className = "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> User Name</th>
                                <th> User Email Id</th>
                                <th> gender</th>
                                <th> status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(
                                    user => 
                                    <tr key = {user.id}>
                                         <td> { user.name} </td>   
                                         <td> {user.email}</td>
                                         <td> {user.gender}</td>
                                         <td> {user.status}</td>
                                         <td>
                                             <button onClick={ () => editUser(user.id)} className="btn btn-info">Update </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => viewUser(user.id)} className="btn btn-info">View </button>
                                             <button style={{marginLeft: "10px"}} onClick={ () => posts(user)} className="btn btn-info">Posts </button>
                                         </td>
                                    </tr>
                                )
                                
                            }
                        </tbody>
                    </table>

             </div>
             <div className = "row">
                <button className="btn btn-primary" onClick={loadMore}> {loadingText}</button>
             </div>

        </div>
    );

    
}

export default ListUserComponent;
