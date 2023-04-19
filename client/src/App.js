import { Switch, Route } from 'react-router-dom';
import Login from './/pages/login/Login.jsx';
import SignUp from './/pages/signup/SignUp.jsx';
import Home from './/pages/home/Home.jsx';
import HomeUser from './/pages/homeUser/HomeUser.jsx';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/home" component={HomeUser} /> 
    </Switch>
  );
}

export default App;
