import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

//Components
import Card from '../../components/Card/Card.js'
// import NewPost from '../../components/NewPost/NewPost.js'
import Navbar from '../../components/Navber/Navbar.js';
import CircularProgress from '@material-ui/core/CircularProgress';

import "./home.css";

class home extends Component {

    constructor() {
        super();
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        let config = {
            headers: {authorization: sessionStorage.getItem('token')}
        }
        axios.get("http://0.0.0.0:8080/get", config)
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

    deleteItem = async (index) => {
        let newArr = this.state.data;
        this.setState({
            data: null
        })
        await newArr.splice(index, 1);
        this.setState({
            data: newArr
        })
        console.log(index)
    }

    render() {
        if (sessionStorage.getItem('token') == null) {
            return(<Redirect to={"/"}/>)
        }

        let dataMarkup = this.state.data ? (
            this.state.data.map((data, i) => (
                <Card data={data} arrIndex={i} deleteItem={this.deleteItem}/>
            ))
        ) : (
            <div className={"container-progress"}>
                <CircularProgress/>
            </div>
        );

        return (
            <div className={"container-home"}>
                <Navbar/>
                    <Grid container spacing={16}>
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
