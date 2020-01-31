import React, { Component } from 'react'
import withStyle from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'

const styles = {
    button: {
        marginBottom: 20
    }
}

class NewPost extends Component {
    constructor() {
        super();
        this.state =  {
            name: '',
            age: 0,
            error: ''
        }
    }
    handleSubmit = (event) => {
        let data = {
            name: this.state.name,
            age: this.state.age
        }

        let config = {
            headers: {token: sessionStorage.getItem('token')}
        }
        axios.post("/post", data, config)
            .then( res => {
                this.setState({
                    error: "Save Pass!!"
                })
            })
            .catch(err => {
                this.setState({
                    error: "Save Fail!!"
                })
            })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container direction="column" justify="flex-start" alignItems="center">
                        <TextField id="outlined-basic" label="Nick Name" name="name" variant="outlined" fullWidth className={classes.button} onChange={this.handleChange}></TextField>
                        <TextField id="standard-number" label="Age" type="number" name="age" variant="outlined" fullWidth className={classes.button} InputLabelProps={{shrink: true,}} onChange={this.handleChange}/>
                        <Button type="submit" variant="outlined" color="primary">Add</Button>
                        <Typography variant="body2" color="textSecondary">{this.state.age}</Typography>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default withStyle(styles)(NewPost)
