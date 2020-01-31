import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

//Components
import Card from '../../components/Card/Card.js'
import NewPost from '../../components/NewPost/NewPost.js'
import Navbar from '../../components/Navber/Navbar.js';
import CircularProgress from '@material-ui/core/CircularProgress';

import "./home.css";

class home extends Component {
    state = {
        data: null
    }

    componentDidMount() {
        let config = {
            headers: {token: sessionStorage.getItem('token')}
        }
        axios.get('/get', config)
            .then(res => {
                console.log(res.data);
                this.setState({
                    data: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        if (sessionStorage.getItem('token') == null) {
            return(<Redirect to={"/"}/>)
        }

        let dataMarkup = this.state.data ? (
            this.state.data.map((data) => <Card data={data}/>)
        ) : (
            // <p>Loading.....</p>
            <center>
                <CircularProgress/>
            </center>
        );
        return (
            <div>
                <Navbar/>
                    {/* <div className={"post-container"}>
                        {dataMarkup}
                    </div>
                    <div className={"new-post-form-container"}>
                        <NewPost/>
                    </div> */}
                    <Grid container spacing={16}>
                        <Grid item sm={9} xs={12} style={{padding: 8}}>
                            {dataMarkup}
                        </Grid>
                        <Grid item sm={3} xs={12} style={{padding: 8}} >
                            <div>
                                <NewPost style={{position: "static"}}/>
                            </div>
                        </Grid>
                    </Grid>
            </div>
        )
    }
}

export default home
