import React, { Component } from 'react'
import Link from 'react-router-dom/Link'

//MUI
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import timeLogo from "../../static/image/timeLogo.png"
import "./Navber.css"
import AddIcon from '@material-ui/icons/Add';

class Navbar extends Component {
    constructor() {
        super();
        this.state =  {
            anchorEl: null,
            date: new Date()
        }
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };


    handleLogout() {
        sessionStorage.removeItem("token");
    }

    componentDidMount() {
        this.callMe()
    }

    callMe () {
        setInterval(() => {
            this.setState({date: new Date()})
        }, 1000)
    }

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
                            <IconButton color="secondary" component={Link} to="/home" >
                                <AddIcon/>
                            </IconButton>
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
                                <MenuItem onClick={this.handleClose}>My account</MenuItem>
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
