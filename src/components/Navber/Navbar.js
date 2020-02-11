import React, { Component } from 'react'
import Link from 'react-router-dom/Link'

//MUI
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
// import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import timeLogo from "../../static/image/timeLogo.png"
import "./Navber.css"
import AddIcon from '@material-ui/icons/Add';
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import axios from "axios";

class Navbar extends Component {
    constructor() {
        super();
        this.state =  {
            anchorEl: null,
            anchorElPort: null,
            date: new Date(),
            name: "",
            clockId: "",
            error: ""
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClickPost = event => {
        this.setState({ anchorElPort: event.currentTarget });
    };

    handleClosePost = () => {
        this.setState({ anchorElPort: null });
    };

    handleSavePost = () => {
        let data = {
            name: this.state.name,
            age: this.state.clockId
        }

        let config = {
            headers: {authorization: sessionStorage.getItem('token')}
        }

        axios.post("http://10.72.1.41:8080/post", data, config)
            .then( res => {
                this.setState({
                    error: "Save Pass!!"
                })
                this.handleClosePost()
            })
            .catch(err => {
                this.setState({
                    error: "Save Fail!!"
                })
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
        this.callMe()
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
                            <Menu
                                id="new-port"
                                anchorEl={this.state.anchorElPort}
                                keepMounted
                                open={Boolean(this.state.anchorElPort)}
                                onClose={this.handleClosePost}
                                style={{padding: "10"}}
                            >
                                <div className={"container-text-field-post"}>
                                    <TextField margin="dense" variant="outlined" id="name" name={"name"} label="Name" type="text" onChange={this.handleChange}/>
                                    <TextField margin="dense" variant="outlined" id="clockId" name={"clockId"} label="Clock ID" type="text" onChange={this.handleChange}/>
                                    <Button variant="contained" color="primary" style={{marginTop: "10px"}} onClick={this.handleSavePost}>
                                        Save
                                    </Button>
                                    <Typography variant="caption" style={{color: "#B7B7B7", left: "50%", transform: "translateX(-50%)"}}>{this.state.error}</Typography>
                                </div>
                            </Menu>
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
