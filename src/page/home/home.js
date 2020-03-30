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

import PATH from '../../utils/Path'

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
        axios.get(PATH.CLOCK+"/items", config)
            .then(res => {
                console.log(res.data.arrayOfClock);
                this.setState({
                    data: res.data.arrayOfClock
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
    }

    addItem = async ( clockId, clockName, timeZone, clockBattery, roomTemperature, firebaseId ) => {
        let data = {
            id: clockId,
            name: clockName,
            timeZone: timeZone,
            battery: clockBattery,
            tem: roomTemperature,
            firebaseId: firebaseId,
            arrIndex: this.state.data.length+1,
            deleteItem: this.deleteItem
        }
        let newArr = await this.state.data;
        await newArr.push(data);
        this.setState({
            data: newArr
        })
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
                <Navbar addItem={this.addItem}/>
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
