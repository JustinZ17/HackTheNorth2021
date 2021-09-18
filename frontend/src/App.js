import "./App.css"
import { useState } from "react";
import SubmitForm from "./components/SubmitForm";
import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Redirect } from "react-router";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login"
import Landing from "./components/Landing"
import axios from "axios";
import CreateUser from "./components/CreateUser"

function App() {

  const [user, setUser] = useState([])

  const checkIfLoggedIn = () => {
    let loggedIn = false

    //Add login Logic

    return loggedIn
  }

  const requestCreateUser = (username, password) => {
    let data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return axios.post("http://localhost:3000/api/create_user/", data)
    .then(response => response.status)
    .catch(response => response.status)
  }

  const requestLogin = (username, password) => {
    let data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return axios.post("http://localhost:3000/api/login/", data)
    .then(response => response.status)
    .catch(response => response.status)
  }


  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Landing}/>
        <Route path="/dashboard" exact render={(props) => checkIfLoggedIn() === false ? 
        <Dashboard/> : <Redirect to={{pathname: "/login", state : {from: props.location}}}/>} />
        <Route path="/login" render={(props) => (<Login loginRequest={requestLogin}/>)} />
        <Route path="/create_user" render={(props) => (<CreateUser createUserRequest={requestCreateUser} />)} />
      </div>
    </Router>
  );
}

export default App;
