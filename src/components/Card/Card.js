import React, { Component } from 'react'
import firebase from '../../utils/Config'
import './Card.css'

//Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import wallClock from "../../static/image/wallClock.png"
import DeleteIcon from "@material-ui/icons/Delete";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import IconButton from "@material-ui/core/IconButton";

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
            firebaseId: "",
            deleteItem: null,
            arrIndex: 0,
            alertStatus: null
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
            clockName: this.state.name,
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
            <Card className={"card"} style={{borderRadius: "27px"}}>
                <CardMedia image={wallClock} title="Test" className={"image"} />
                <CardContent style={{width: '100%', paddingLeft: "0"}}>
                    <div className={"container-content"}>
                        <div className={"container-information"}>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>NAME: {this.state.clockName}</Typography>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>TIME ZONE: {this.state.timeZone}</Typography>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>BATTERY : {this.state.clockBattery}%</Typography>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>TEMPERATURE : {this.state.roomTemperature}°C</Typography>
                            <Typography variant="caption" style={{color: "#B7B7B7"}}>ID : {this.state.id}</Typography>
                        </div>
                    </div>
                </CardContent>
                <div>
                    <form className={"form"}>
                        <div className={"container-button"}>
                            <IconButton color="secondary" aria-label="upload picture" component="span" onClick={this.dialogClickOpen} style={{backgroundColor: "#80808038", borderRadius: "5px 20px 5px 5px", margin: "10px"}}>
                                <EditTwoToneIcon style={{color: "#7F7F7F"}} />
                            </IconButton>
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={this.handleDelete} style={{backgroundColor: "#ffbaba", borderRadius: "5px 5px 20px 5px", margin: "10px"}}>
                                <DeleteIcon style={{color: "#7F7F7F"}} />
                            </IconButton>
                        </div>
                    </form>
                </div>
                <div>
                    <Dialog open={this.state.dialog} onClose={this.dialogClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Config your clock.</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <Typography variant="caption" style={{color: "#B7B7B7"}}>{this.state.clockName}</Typography>
                                <Typography variant="caption" style={{color: "#B7B7B7"}}>{this.state.timeZone}</Typography>
                            </DialogContentText>
                            <TextField margin="dense" id="name" name={"name"} label="Name" type="text" defaultValue={this.state.clockName} onChange={this.handleChange} fullWidth/>
                            <TextField margin="dense" id="timeZone" name={"timeZone"} label="Time Zone" type="text" defaultValue={this.state.timeZone} onChange={this.handleChange} fullWidth/>
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
                <div>
                    <Snackbar open={this.state.alertStatus} autoHideDuration={6000} onClose={this.alertClose}>
                        <Alert onClose={this.alertClose} severity="success">
                            This is a success message!
                        </Alert>
                    </Snackbar>
                </div>
            </Card>
        )
    }
}

export default (Paper)
