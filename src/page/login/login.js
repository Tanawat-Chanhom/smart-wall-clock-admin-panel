import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import { Grid } from '@material-ui/core';
import {Redirect} from 'react-router-dom'

// import Navbar from '../../components/Navber/Navbar.js';

import './login.css';

import logo from '../../static/image/time.png'

class login extends Component {

    constructor() {
        super();
        this.state =  {
            username: '',
            password: '',
            error: '',
            status: false
        }
    }

    handleSubmit = async (event) => {
        let data = {
            username: this.state.username,
            password: this.state.password
        }
        await axios.post("http://10.72.1.41:8080/auth/login", data)
            .then( res => {
                if (res.data.token) {
                    sessionStorage.setItem("token", res.data.token);
                    this.setState({
                        status: true
                    })
                } else {
                    this.setState({
                        error: "Username or password is incorrect."
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
        if (this.state.status || sessionStorage.getItem("token") != null) {
            return (<Redirect to={"/home"}/>)
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
                        <Grid container direction="column" justify="space-around" alignItems="center">
                            <div className={"form-login"}>
                                <TextField id="outlined-basic" label="Username" type="text" name="username" variant="outlined" fullWidth onChange={this.handleChange}/><br/>
                                <TextField id="outlined-basic" label="Password" type="password" name="password" variant="outlined" fullWidth onChange={this.handleChange}/><br/>
                            </div>
                            {/*<Grid container >*/}
                            {/*    <Grid item sm={12} xs={12} style={{padding: 8}}>*/}
                            {/*        */}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </form>
                    <Button variant="outlined" color="primary" className={"bottom-sign"} onClick={this.handleSubmit}>Sign in</Button>
                    <Typography variant="overline" style={{color: "red"}}>{this.state.error}</Typography>
                </div>
            </div>
        )
    }
}

export default login
