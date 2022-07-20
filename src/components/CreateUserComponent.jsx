import React, { useState } from 'react'
import {  useParams } from 'react-router-dom'
import UserService from '../services/UserService';
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../common/LoadingSpinner";

const CreateUserComponent = () => {
    const { id } = useParams()

    const [user, setUser] = React.useState({name: '', email: '',gender :"male",status:"active"});
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (id === '_add') {
            return
        } else {
            setIsLoading(true)
            UserService.getUserDetails(id).then((res) => {
                let user = res.data;
                setUser({
                    name: user.name,
                    email: user.email,
                    gender: user.gender,
                    status:user.status
                });
                setIsLoading(false)
            });
        }

    }, []);

    const saveOrUpdateUser = (e) => {
        setIsLoading(true)
        e.preventDefault();
//        "name":"demo","email":"demo@allen.io","gender":"male","status":"active"
         let userJson = {name: user.name, email: user.email,gender :user.gender,status:user.status};
        console.log('user => ' + JSON.stringify(userJson));

        // step 5
        if (id === '_add') {
            UserService.createUser(userJson).then(res => {
                navigate('/');
                setIsLoading(false)
            }).catch(err => {
                setIsLoading(false)
                alert(err);
            });
        } else {
            UserService.updateUser(userJson, id).then(res => {
                navigate('/');
                setIsLoading(false)
            }).catch(err => {
                setIsLoading(false)
                alert(err);
            });
        }
    }

    const changeNameHandler = (nameValue) => {
        setUser({...user, name: nameValue})
    }

    const changeEmailHandler = (emailValue) => {
        setUser({...user, email: emailValue})
    }

    const cancel = () => {
        navigate(-1)
    }

    const onChangeStatus = (event) => {
        setUser({...user, status: event.target.value})
    }
    const onChangeGender = (event) => {
        setUser({...user, gender: event.target.value})
    }
    

    const getTitle = () => {
        if (id === '_add') {
            return <h3 className="text-center">Add Users</h3>
        } else {
            return <h3 className="text-center">Update Users</h3>
        }
    }
    if (!user) return null;

    return (
        isLoading ? <LoadingSpinner /> :
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            getTitle()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Name: </label>
                                    <input placeholder="First Name" name="firstName" className="form-control"
                                        value={user.name} onChange={e => changeNameHandler(e.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label> Email Id: </label>
                                    <input placeholder="Email Address" name="emailId" className="form-control"
                                        value={user.email} onChange={ e =>changeEmailHandler(e.target.value)} />
                                </div>
                                    <div style={{marginTop: "10px"}} onChange={onChangeGender}>
                                        <input type="radio" value={user.gender} name="gender" /> Male
                                        <input style={{ marginLeft: "10px" }} type="radio" value={user.gender} name="gender" /> Female
                                    </div>
                                    
                                    <div style={{marginTop: "10px"}} onChange={onChangeStatus}>
                                    <label> Status: </label>
                                        <input type="radio" value={user.status} name="status" /> Active
                                        <input style={{ marginLeft: "10px" }} type="radio" value={user.status} name="status" /> Inactive
                                    </div>
                                <div style={{marginTop: "10px"}}>
                                <button className="btn btn-success" onClick={saveOrUpdateUser}>Save</button>
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

export default CreateUserComponent