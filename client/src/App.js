import { Switch, Route } from 'react-router-dom';
import Login from './components/login/Login.jsx';
import SignUp from './components/signup/SignUp.jsx';
import Home from './pages/home/Home.jsx';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
}

export default App;
