import './App.css';
import {useEffect} from "react"
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Server from './pages/Server';
import TextChannel from './pages/TextChannel';




function App() {
  
  


  return (
    <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/server/:server_id" component={Server} />
          <Route path="/channels/:server_id/:text_id" component={TextChannel} />

        </Switch>
    </div>
  );
}

export default App;
