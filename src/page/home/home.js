import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

//Components
import Card from '../../components/Card/Card.js'
import Teble from '../../components/Teble/Teble.js'
// import NewPost from '../../components/NewPost/NewPost.js'
import Navbar from '../../components/Navber/Navbar.js';
import CircularProgress from '@material-ui/core/CircularProgress';

import "./home.css";

import PATH from '../../utils/Path'

class home extends Component {

    constructor() {
        super();
        this.state = {
            data: null,
            lowBattery: <CircularProgress/>,
            incorrectTime: <CircularProgress/>,
            disconnect: <CircularProgress/>,
            deviceOff: <CircularProgress/>,
        }
    }

    componentDidMount() {
        let config = {
            headers: {authorization: sessionStorage.getItem('token')}
        }
        axios.get(PATH.CLOCK+"/items", config)
            .then(res => {
                console.log(res.data.arrayOfClock);
                let num1 = 0;
                let num2 = 0;
                let num3 = 0;
                let num4 = 0;

                res.data.arrayOfClock.forEach(data => {
                    if (data.clockStatus === 'Low Battery') {
                        num1++;
                    } else if (data.clockStatus === 'Incorrect Time') {
                        num2++;
                    } else if (data.clockStatus === 'Disconnect') {
                        num3++;
                    } else if (data.clockStatus === 'Device OFF') {
                        num4++;
                    }
                })
                this.setState({
                    data: res.data.arrayOfClock,
                    lowBattery: num1+'/'+res.data.arrayOfClock.length,
                    incorrectTime: num2+'/'+res.data.arrayOfClock.length,
                    disconnect: num3+'/'+res.data.arrayOfClock.length,
                    deviceOff: num4+'/'+res.data.arrayOfClock.length,
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
            deleteItem: this.deleteItem,

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
                <Card key={i} data={data} arrIndex={i} deleteItem={this.deleteItem}/>
            ))
        ) : (
            <div className={"container-progress"}>
                <CircularProgress/>
            </div>
        );

        let tableMarkup = this.state.data ? (
            <Teble clockData={this.state.data}/>
        ) : (
            <div className={"container-progress"}>
                <CircularProgress/>
            </div>
        )

        return (
            <div className={"container-home"}>
                <Navbar addItem={this.addItem}/>
                    <div className={'content-container'}>
                        <div className={'clocks-items-container'}>
                            <div className={'clocks-items-title'}>
                                <p>All</p>
                            </div>
                            <div className={'clocks-items'}>
                                {dataMarkup}
                                {dataMarkup}
                            </div>
                        </div>
                        <div className={'status-items-container'}>
                            <div className={'status-header-container'}>
                                <div className={'status-item'}>
                                    <div className={'status-item-header'}>
                                        <p>Low Battery</p>
                                    </div>
                                    <div className={'status-item-value'}>
                                        <p>{this.state.lowBattery}</p>
                                    </div>
                                </div>
                                <div className={'status-item'}>
                                    <div className={'status-item-header'}>
                                        <p>Incorrect Time</p>
                                    </div>
                                    <div className={'status-item-value'}>
                                        <p>{this.state.incorrectTime}</p>
                                    </div>
                                </div>
                                <div className={'status-item'}>
                                    <div className={'status-item-header'}>
                                        <p>Disconnect</p>
                                    </div>
                                    <div className={'status-item-value'}>
                                        <p>{this.state.disconnect}</p>
                                    </div>
                                </div>
                                <div className={'status-item'}>
                                    <div className={'status-item-header'}>
                                        <p>Device OFF</p>
                                    </div>
                                    <div className={'status-item-value'}>
                                        <p>{this.state.deviceOff}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={'status-table-container'}>
                                {tableMarkup}
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default home
