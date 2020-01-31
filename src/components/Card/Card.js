import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

//Mui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { Grid } from '@material-ui/core';

import axios from 'axios'

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        boxShadow: "3px 6px 10px 2px #9E9E9E99"
    },
    image: {
        minWidth: 200,

    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Paper extends Component {
    constructor() {
        super();
        this.state =  {
            id: 0
        }
    }
    handleDelete = (event) => {
        axios.delete("/delete/"+this.state.id)
            .then(res => {

            })
            .catch(err => {

            })
    }
    render() {
        const { classes, data: { id, name, age } } = this.props
        // this.state.id = id;
        return (
            <Card className={classes.card}>
                <CardMedia
                image="https://live.staticflickr.com/7827/46328152484_be600a86eb_b.jpg"
                title="Test"
                className={classes.image}
                />
                <CardContent style={{width: '100%'}}>
                    <Grid container spacing={16}>
                        <Grid sm={9} xs={12}>
                            <Typography variant="h5">Name: {name}</Typography>
                            <Typography variant="h6" >Age: {age}</Typography>
                            {/* <Typography variant="body2" color="textSecondary">ID: {id}</Typography> */}
                            <Typography variant="body1" >Content Text</Typography>
                        </Grid>
                        <Grid sm={3} xs={12} container direction="column" justify="flex-start" alignItems="center">
                            <form onSubmit={this.handleDelete}>
                                <Button type="submit" variant="contained" color="secondary" onClick={this.handleDelete}>Delete</Button>
                                {/* <Button type="submit" variant="contained" color="secondary" onClick={this.handleDelete}>Update</Button> */}
                            </form>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Paper)
