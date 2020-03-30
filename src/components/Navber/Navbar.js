import React, { Component } from 'react'
import Link from 'react-router-dom/Link'
import "./Navber.css"

//MUI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import timeLogo from "../../static/image/timeLogo.png"
import AddIcon from '@material-ui/icons/Add';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import axios from "axios";

import PATH from "../../utils/Path";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            anchorEl: null,
            anchorElPort: null,
            date: new Date(),
            name: "",
            clockId: "",
            error: "",
            addItem: null
        }
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClickPost = () => {
        this.setState({ dialog: true });
    };

    handleClosePost = () => {
        this.setState({ dialog: false });
    };

    handleSavePost = () => {
        let data = {
            clockName: this.state.name,
            clockId: this.state.clockId
        };

        let config = {
            headers: {authorization: sessionStorage.getItem('token')}
        };

        axios.post(PATH.CLOCK +"/newItem", data, config)
            .then( res => {
                let data = res.data.clockData;
                this.state.addItem( data.clockId, data.name, data.timeZone, data.battery, data.tem, data.firebaseId );
                this.setState({
                    error: "Save Pass!!"
                });
                setInterval( () => {
                    this.handleClosePost();
                    this.setState({
                        error: ""
                    })
                }, 1000)
            })
            .catch( () => {
                this.setState({
                    error: "Save Fail!!"
                });
                setInterval( () => {
                    this.handleClosePost()
                }, 1500)
            })
    };

    handleLogout() {
        sessionStorage.removeItem("token");
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount() {
        this.callMe();
        const { addItem } = this.props;
        this.setState({
            addItem: addItem
        })
    };

    callMe() {
        setInterval(() => {
            this.setState({date: new Date()})
        }, 1000)
    };

    render() {
        if (sessionStorage.getItem("token") != null) {
            return (
                <AppBar>
                    <ToolBar style={{justifyContent: "space-between", backgroundColor: "#EAEAEA"}}>
                        <div className={"container-img-logo"}>
                            <img src={timeLogo} alt=""/>
                        </div>
                        <div className={"container-time"}>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin", letterSpacing: "2px"}}>{this.state.date.toLocaleTimeString()}</Typography>
                        </div>
                        <div className={"button-container"}>
                            <IconButton color="secondary" component={Link} to="/home" onClick={this.handleClickPost}>
                                <AddIcon/>
                            </IconButton>
                            <Dialog open={this.state.dialog} onClose={this.handleClosePost} aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        To subscribe to this website, please enter your email address here. We will send updates
                                        occasionally.
                                    </DialogContentText>
                                    <TextField autoFocus margin="dense" name="name" label="Name" type="text" fullWidth onChange={this.handleChange}/>
                                    <TextField autoFocus margin="dense" name="clockId" label="Clock ID" type="text" fullWidth onChange={this.handleChange}/>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClosePost} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={this.handleSavePost} color="primary">
                                        Subscribe
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <MoreVertIcon color={"disabled"}/>
                            </IconButton>
                            <Menu
                                id="navber-menu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose} component={Link} to="/home">Home</MenuItem>
                                <MenuItem onClick={this.handleClose} component={Link} to="/profile" >Profile</MenuItem>
                                <MenuItem onClick={this.handleLogout} component={Link} to="/" >Logout</MenuItem>
                                <MenuItem onClick={this.handleClose} >Version: 0.12.0</MenuItem>
                            </Menu>
                        </div>
                    </ToolBar>
                </AppBar>
            )
        } else {
            return (
                <AppBar>
                    <ToolBar>
                        <Typography variant="body2" color="textSecondary">ข้าวQ</Typography>
                    </ToolBar>
                </AppBar>
            )
        }
    }
}

export default Navbar