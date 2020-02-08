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
            headers: {authorization: sessionStorage.getItem('token')}
        }
        axios.get('http://192.168.1.35:8080/get', config)
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
            <div className={"container-progress"}>
                <CircularProgress/>
            </div>
        );
        return (
            <div className={"container-home"}>
                <Navbar/>
                    <Grid container spacing={16}>
                        {/*<Grid item sm={3} xs={12} style={{padding: 8}}>*/}
                        {/*    <div>*/}
                        {/*        <NewPost style={{position: "static"}}/>*/}
                        {/*    </div>*/}
                        {/*</Grid>*/}
                        <Grid item sm={12} xs={12} style={{padding: 8}} >
                            <div className={"dataMarkup"}>
                                {dataMarkup}
                            </div>
                        </Grid>
                    </Grid>
            </div>
        )
    }
}

export default home
