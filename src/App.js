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


const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn
})

function App(props) {
  
  


  return (
    <div className="App">
        <Switch>
          {props.isLoggedIn ? <Redirect from='/login' to='/home'/> : ''}
          {props.isLoggedIn ? <Redirect from='/register' to='/home'/> : ''}
          {!props.isLoggedIn ? <Redirect from='/home' to='/login'/> : ''}
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/server/:server_id" component={Server} />
          <Route path="/channels/:server_id/:text_id" component={TextChannel} />
          <Redirect from='/' to='/login'/>

        </Switch>
    </div>
  );
}

export default connect(mapStateToProps, {})(App);
