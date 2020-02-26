import React, { Component } from 'react'
// import withStyles from '@material-ui/core/styles/withStyles'
import './Card.css'

//Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button'
// import { Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import axios from 'axios'

import wallClock from "../../static/image/wallClock.png"
import DeleteIcon from "@material-ui/icons/Delete";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import IconButton from "@material-ui/core/IconButton";

class Paper extends Component {
    constructor() {
        super();
        this.state =  {
            id: 0,
            dialog: false,
            name: '',
            timeZone: '',
            battery: 0,
            tem: 0,
            firebaseId: "",
            deleteItem: null,
            arrIndex: 0,
            alertStatus: null
        }
    }
    handleDelete = (event) => {
        this.state.deleteItem(this.state.arrIndex)
        this.setState({
            alertStatus: true
        })
        axios.delete("https://us-central1-smart-wall-clock-c5a79.cloudfunctions.net/clock/item/"+this.state.firebaseId)
            .then(res => {
                console.log(res)
                // this.setState({
                //     alertStatus: true
                // })
            })
            .catch(err => {
                console.log(err)
            })
    }

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
        }
        axios.put("https://us-central1-smart-wall-clock-c5a79.cloudfunctions.net/clock/item/"+this.state.firebaseId, data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        this.dialogClose()
    }

    componentDidMount() {
        const { data: { clockId, name, timeZone, battery, tem, firebaseId }, arrIndex, deleteItem } = this.props;
        this.setState({
            id: clockId,
            name: name,
            timeZone: timeZone,
            battery: battery,
            tem: tem,
            firebaseId: firebaseId,
            arrIndex: arrIndex,
            deleteItem: deleteItem
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

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
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>NAME: {this.state.name}</Typography>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>TIME ZONE: {this.state.timeZone}</Typography>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>BATTERY : {this.state.battery}%</Typography>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>TEMPERATURE : {this.state.tem}°C</Typography>
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
                                <Typography variant="caption" style={{color: "#B7B7B7"}}>{this.state.name}</Typography>
                                <Typography variant="caption" style={{color: "#B7B7B7"}}>{this.state.timeZone}</Typography>
                            </DialogContentText>
                            <TextField margin="dense" id="name" name={"name"} label="Name" type="text" defaultValue={this.state.name} onChange={this.handleChange} fullWidth/>
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
