import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import UserService from '../services/UserService'
import LoadingSpinner from "../common/LoadingSpinner";

const ListUserComponent = () => {
    const [users, setUsers] = React.useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const viewUser= (id) =>{
        navigate(`/view-user/${id}`);
    }
    const editUser= (id) =>{
        navigate(`/add-user/${id}`);
    }
   
    React.useEffect(() => {
        setIsLoading(true)
        UserService.getUserList(1).then((res) => {
            setUsers(res.data);
            setIsLoading(false)
        });

    }, []);
    
      if (!users) return null;

    const addUser = () =>{
        navigate('/add-user/_add');
    }
    const posts= (user) =>{
        console.log(`/user-posts/${user.id,user.email}`)
        navigate(`/user-posts/${user.id}`);
    }

    const renderViews = (
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

        </div>
    );

    return (
        <div>
        {isLoading ? <LoadingSpinner /> : renderViews}
        </div>
    );
}

export default ListUserComponent;
