import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import {Redirect} from 'react-router-dom'
import PATH from '../../utils/Path';

// import Navbar from '../../components/Navber/Navbar.js';
import CircularProgress from '@material-ui/core/CircularProgress';

import './login.css';

import logo from '../../static/image/time.png'

class login extends Component {

    constructor() {
        super();
        this.state =  {
            username: '',
            password: '',
            error: '',
            status: false,
            onLoading: false
        }
    }

    handleSubmit = async (event) => {
        this.setState({
            onLoading: true
        })
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        await axios.post(PATH.AUTH+"/login", data)
            .then( res => {
                if (res.data.token) {
                    sessionStorage.setItem("token", res.data.token);
                    this.setState({
                        status: true
                    })
                } else {
                    this.setState({
                        error: res.data.message,
                        onLoading: false
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        let error;

        if (this.state.status || sessionStorage.getItem("token") != null) {
            return (<Redirect to={"/home"}/>)
        }

        let test = this.state.onLoading ? (
            <CircularProgress />
        ) : (
            <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Sign in</Button>
        );

        if (this.state.error !== "") {
            error = (
                <div className={"error-text"}>
                    <Typography variant="overline" style={{color: "red"}}>{this.state.error}</Typography>
                </div>
            );
        }

        return (
            <div className={"container-login"}>
                <div className={"container-logo"}>
                    <img src={logo} alt=""/>
                </div>
                <div className={"container-title"}>
                    <h4>Smart Wall Clock - Admin Panel</h4>
                </div>
                <div className={"form-container"}>
                    <form noValidate>
                        <div className={"form-login"}>
                            <div>
                                <TextField id="outlined-basic" label="Username" type="text" name="username" variant="outlined" fullWidth onChange={this.handleChange}/><br/>
                            </div>
                            <div style={{marginTop: "8%"}}>
                                <TextField id="outlined-basic" label="Password" type="password" name="password" variant="outlined" fullWidth onChange={this.handleChange}/><br/>
                            </div>
                        </div>
                    </form>
                    <div className={"bottom-sign"}>
                        { test }
                    </div>
                    { error }
                </div>
            </div>
        )
    }
}

export default login
