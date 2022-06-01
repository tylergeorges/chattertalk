import './App.css';
import {useEffect} from "react"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Server from './pages/Server';
import TextChannel from './pages/TextChannel';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { useHistory } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { w3cwebsocket as W3CWebSocket } from "websocket"
import { fetchCr, fetchHome, loggedin } from './actions/actions';
import JoinServer from './components/JoinServer';
import Landing from './pages/Landing';



function App() {



  return (
        <Switch>
           
            <Route  path="/register"  component={Register}/>
            <Route  path="/login" component={Login} />
            <Route  path="/home" component={Home} />

           {/* {props.isLoading === false && props.isLoggedIn === null ? <Redirect to="/login"/> : ''} */}

           {/* {props.isLoading === false && props.isLoggedIn === true ? <Redirect to="/home"/> : <Redirect to="/login"/>} */}

            
            <Route  path="/channels/:server_id/:text_id" component={TextChannel} />
            <Route  path="/server/:server_id" component={Server} />
            <Route exact path="/:server_code" component={JoinServer} /> 
            <Route exact path="/" component={Landing} /> 
            {/* <Redirect from='/' to='/login'/> */}
        </Switch>
    
  )
}

export default connect(null, {fetchHome, loggedin})(App);
