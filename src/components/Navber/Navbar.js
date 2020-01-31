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

class Navbar extends Component {
    constructor() {
        super();
        this.state =  {
            anchorEl: null
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

    render() {
        if (sessionStorage.getItem("token") != null) {
            return (
                <AppBar>
                    <ToolBar style={{justifyContent: "space-between"}}>
                        <Typography variant="body1" color="white">ข้าวQ</Typography>
                        <div className={"button-container"}>
                            <Button color="inherit" component={Link} to="/home" >Home</Button>
                            <IconButton 
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <MoreVertIcon style={{color: "white"}}/>
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
