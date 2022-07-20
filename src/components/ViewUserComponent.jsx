import React from 'react';
import { useNavigate } from "react-router-dom";
import UserService from '../services/UserService'
import {  useParams } from 'react-router-dom'
import LoadingSpinner from "../common/LoadingSpinner";

const ViewUserComponent = () => 
{
    const { id } = useParams()
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true)
        UserService.getUserDetails(id).then( res => {
            setUser(res.data);
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            alert(err);
        })

    }, []);

    if (!user) return null;

    return (
        <div className="container">
          {isLoading ? <LoadingSpinner /> : 
            <div>
            <br></br>
            <div className = "card col-md-6 offset-md-3">
                <h3 className = "text-center"> User Details</h3>
                <div className = "card-body">
                    <div className = "row">
                        <label> User  Name: </label>
                        <div> { user.name }</div>
                    </div>
                    <div className = "row">
                        <label> User Email ID: </label>
                        <div> { user.email }</div>
                    </div>
                </div>
    
            </div>
        </div>
          }
        </div>
      );
   
}
export default ViewUserComponent
