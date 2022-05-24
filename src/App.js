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

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  isLoading: state.isLoading,
  login_status: state.login_status,
})

function App(props) {
  const url = window.location.pathname.split('/').pop();

  const history = createBrowserHistory()
  useEffect(() =>{
    console.log(props)

  
    // props.loggedin(props.isLoggedIn)
    // console.log(props.login_status)
    // if(props.isLoggedIn === true){
    //   props.fetchHome()
    // }



  },[])

  return (
    <div>
        <Switch>

           
            <Route  path="/register" ><Register isLoggedIn={props.isLoggedIn}/></Route>
            <Route  path="/login" component={Login} />
            <Route  path="/home" component={Home} />
            
           {props.isLoading === false && props.isLoggedIn === null ? <Redirect to="/login"/> : ''}

           {props.isLoading === false && props.isLoggedIn === true ? <Redirect to="/home"/> : <Redirect to="/login"/>}

            
            <Route  path="/channels/:server_id/:text_id" component={TextChannel} />
            <Route  path="/server/:server_id" component={Server} />
            <Route exact path="/:server_code" component={JoinServer} /> 
            <Redirect from='/' to='/login'/>
        </Switch>

    
            </div>
  )
}

export default connect(mapStateToProps, {fetchHome, loggedin})(App);
