import React, { useState } from 'react'
import {  useParams } from 'react-router-dom'
import UserService from '../services/UserService';
import { useNavigate } from "react-router-dom";


const CreateUserComponent = () => {
    const { id } = useParams()

    const [user, setUser] = React.useState({name: '', email: '',gender :"male",status:"active"});
    const navigate = useNavigate();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    React.useEffect(() => {
        if (id === '_add') {
            return
        } else {
            UserService.getUserDetails(id).then((res) => {
                let user = res.data;
                setUser({
                    name: user.name,
                    email: user.email
                });
            });
        }

    }, []);

    const saveOrUpdateUser = (e) => {
        e.preventDefault();
//        "name":"demo","email":"demo@allen.io","gender":"male","status":"active"
         let userJson = {name: user.name, email: user.email,gender :"male",status:"active"};
        console.log('user => ' + JSON.stringify(userJson));

        // step 5
        if (id === '_add') {
            UserService.createUser(userJson).then(res => {
                navigate('/');
            });
        } else {
            UserService.updateUser(userJson, id).then(res => {
                navigate('/');
            });
        }
    }

    const changeNameHandler = (nameValue) => {
        let userTemp = user;
        setUser({
            name: nameValue,
            email: userTemp.email
        });
    }

    const changeEmailHandler = (emailValue) => {
        let userTemp = user;
        setUser({
            name:  userTemp.name,
            email:emailValue
        });
    }

    const cancel = () => {
        navigate('/users');
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