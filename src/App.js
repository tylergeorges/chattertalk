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
import { fetchHome } from './actions/actions';
import JoinServer from './components/JoinServer';

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  isLoading: state.isLoading
})

function App(props) {
  const url = window.location.pathname.split('/').pop();

  const history = createBrowserHistory()

  useEffect(() =>{
    props.fetchHome()


  },[props.isLoggedIn, url])

  return (
    <div>
        <Switch>
            <Route  path="/home" component={Home} />
            <Route  path="/login" component={Login} />
            <Route  path="/register" ><Register isLoggedIn={props.isLoggedIn}/></Route>
            <Route  path="/channels/:server_id/:text_id" component={TextChannel} />
            <Route  path="/server/:server_id" component={Server} />
            <Route exact path="/:server_code" component={JoinServer} />
            <Redirect from='/' to='/login'/>
        </Switch>

            {/* { props.isLoggedIn ? <Redirect from='/login' to='/home'/> : '' }
            { props.isLoggedIn ? <Redirect from='/register' to='/home'/> : '' }
            {!props.isLoggedIn  ? <Redirect from='/home' to='/login'/> : '' }
            {!props.isLoggedIn ? <Redirect from='/channels/:server_id/:text_id' to='/login'/> : '' }
            {!props.isLoggedIn  ? <Redirect from='/server/:server_id' to='/login'/> : '' } */}
            </div>
  )
}

export default connect(mapStateToProps, {fetchHome})(App);
