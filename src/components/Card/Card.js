import React, { Component } from 'react'
import firebase from '../../utils/Config'
import './Card.css'

//Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from "@material-ui/icons/Delete";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import HistoryIcon from '@material-ui/icons/History';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import UpdateIcon from '@material-ui/icons/Update';

import axios from 'axios'
import PATH from '../../utils/Path'

class Paper extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            id: 0,
            dialog: false,
            clockName: '',
            timeZone: '',
            clockBattery: 0,
            roomTemperature: 0,
            firebaseId: '',
            deleteItem: null,
            arrIndex: 0,
            alertStatus: null,
            error: ''
        };
    }

    handleDelete = () => {
        this.state.deleteItem(this.state.arrIndex);
        this.setState({
            alertStatus: true
        });
        let config = {
            headers: {authorization: sessionStorage.getItem('token')}
        };
        axios.delete(PATH.CLOCK+"/item/"+this.state.firebaseId, config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    };

    dialogClickOpen = () => {
        this.setState({
            dialog: true
        })
    };

    dialogClose = () => {
        this.setState({
            dialog: false
        })
    };

    saveChange = () => {
        let data = {
            clockName: this.state.clockName,
            timeZone: this.state.timeZone
        };
        let config = {
            headers: {authorization: sessionStorage.getItem('token')}
        };
        axios.put(PATH.CLOCK +"/item/"+this.state.firebaseId, data, config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });
        this.dialogClose()
    };

    componentDidMount() {
        const { data: { clockId, clockName, timeZone, clockBattery, roomTemperature, firebaseId }, arrIndex, deleteItem } = this.props;
        this.setState({
            id: clockId,
            clockName: clockName,
            timeZone: timeZone,
            clockBattery: clockBattery,
            roomTemperature: roomTemperature,
            firebaseId: firebaseId,
            arrIndex: arrIndex,
            deleteItem: deleteItem
        });

        const database = firebase.database().ref('/Clocks/'+firebaseId);
        database.on('value', snap => {
            this.setState({
                roomTemperature: snap.val().roomTemperature,
                clockBattery: snap.val().clockBattery
            });
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    alertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            alertStatus:false
        })
    };

    render() {
        return (
            <Card className={"card"} style={{borderRadius: "0.5em", padding: '10px'}}>
                <CardContent style={{width: '100%', padding: "0"}}>
                    <div className={"container-content"}>
                        <div className={"container-information"}>
                            <Typography variant="p" style={{color: "#707070",width: '100%'}}>NAME: {this.state.clockName}</Typography>
                            <Typography variant="p" style={{color: "#707070",width: '100%'}}>TIME ZONE: {this.state.timeZone}</Typography>
                            <Typography variant="p" style={{color: "#707070",width: '100%'}}>BATTERY : {this.state.clockBattery}%</Typography>
                            <Typography variant="p" style={{color: "#707070",width: '100%'}}>TEMPERATURE : {this.state.roomTemperature}°C</Typography>
                            <Typography variant="caption" style={{color: "#B7B7B7", fontSize: '1vmin', width: '100%'}}>ID : {this.state.id}</Typography>
                        </div>
                    </div>
                </CardContent>
                <div>
                    <form className={"form"}>
                        <div className={"container-button"}>
                            <IconButton color="secondary" aria-label="upload picture" component="span" onClick={this.dialogClickOpen} style={{backgroundColor: "#80808038", borderRadius: "0.2em", padding: "10px", margin: '5px'}}>
                                <EditTwoToneIcon/>
                            </IconButton>
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={this.handleDelete} style={{backgroundColor: "#ffbaba", borderRadius: "0.2em", padding: "10px", margin: '5px'}}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </form>
                </div>
                <div>
                    <Dialog open={this.state.dialog} onClose={this.dialogClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">SETTING.</DialogTitle>
                        <DialogContent>
                            <TextField margin="dense" id="clockName" name={"clockName"} label="Clock Name" type="text" defaultValue={this.state.clockName} onChange={this.handleChange} fullWidth/>
                            <TextField margin="dense" id="timeZone" name={"timeZone"} label="Time Zone" type="text" defaultValue={this.state.timeZone} onChange={this.handleChange} fullWidth/>
                            <Typography variant="H2" style={{color: "#707070",width: '100%'}}>Actions: </Typography>
                            <IconButton color="secondary" aria-label="upload picture" component="span"  style={{borderRadius: "0.2em", padding: "10px", margin: '5px'}}>
                                <ArrowBackIcon/>
                            </IconButton>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<HighlightOffIcon />}
                            >
                                STOP
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<UpdateIcon />}
                                style={{marginLeft: '5px'}}
                            >
                                RUN
                            </Button>
                            <IconButton color="secondary" aria-label="upload picture" component="span"  style={{borderRadius: "0.2em", padding: "10px", margin: '5px'}}>
                                <ArrowForwardIcon/>
                            </IconButton>
                            <IconButton color="primary"  aria-label="upload picture" component="span"  style={{borderRadius: "0.2em", padding: "10px", margin: '5px'}}>
                                <HistoryIcon/>
                            </IconButton>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.dialogClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.saveChange} color="primary">
                                Save Change
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default (Paper)
