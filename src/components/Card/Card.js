import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import './Card.css'

//Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core';
import axios from 'axios'

import wallClock from "../../static/image/wallClock.png"
import DeleteIcon from "@material-ui/icons/Delete";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import IconButton from "@material-ui/core/IconButton";

class Paper extends Component {
    constructor() {
        super();
        this.state =  {
            id: 0
        }
    }
    handleDelete = (event) => {
        axios.delete("http://localhost:8080/delete/"+this.state.id)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        const { data: { name, age } } = this.props
        return (
            <Card className={"card"} style={{borderRadius: "27px"}}>
                <CardMedia image={wallClock} title="Test" className={"image"} />
                <CardContent style={{width: '100%', paddingLeft: "0"}}>
                    <div className={"container-content"}>
                        <div className={"container-information"}>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>NAME: {name}</Typography>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>TIME ZONE: {age}</Typography>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>BATTERY : 100%</Typography>
                            <Typography variant="h6" style={{color: "#707070", fontSize: "3vmin"}}>TEMP : 25ºC</Typography>
                            <Typography variant="caption" style={{color: "#B7B7B7"}}>ID : e2691809-191d-4fbf</Typography>
                        </div>
                    </div>
                </CardContent>
                <div>
                    <form onSubmit={this.handleDelete} className={"form"}>
                        <div className={"container-button"}>
                            <IconButton color="secondary" aria-label="upload picture" component="span" onClick={""} style={{backgroundColor: "#80808038", borderRadius: "5px 20px 5px 5px", margin: "10px"}}>
                                <EditTwoToneIcon style={{color: "#7F7F7F"}} />
                            </IconButton>
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={""} style={{backgroundColor: "#ffbaba", borderRadius: "5px 5px 20px 5px", margin: "10px"}}>
                                <DeleteIcon style={{color: "#7F7F7F"}} />
                            </IconButton>
                        </div>
                    </form>
                </div>
            </Card>
        )
    }
}

export default (Paper)
