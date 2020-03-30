import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

//Pages
import Home from './page/home/home.js'
import Login from './page/login/login.js'
import Profile from './page/profile/profile.js'

//Components

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e53935',
    },
    secondary: {
      main: '#00e5ff'
    }
  },
  typography: {
    useNextVariants: true,
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
              <Switch>
                <Route exact path="/home" component={Home}></Route>
                <Route exact path="/" component={Login}></Route>
                <Route exact path="/profile" component={Profile}></Route>
              </Switch>
          </Router>
        </div>
      </MuiThemeProvider>
    )
  }
}


export default App;
