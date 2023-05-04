import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './/pages/login/Login.jsx';
import SignUp from './/pages/signup/SignUp.jsx';
import LoginTeam from './pages/LoginTeam/LoginTeam.jsx';
import Home from './/pages/home/Home.jsx';
import HomeUser from './/pages/homeUser/HomeUser.jsx';
import HomeTeam from './/pages/homeTeam/HomeTeam.jsx';
import Post from './/pages/post/Post.jsx';
import Page404 from './pages/404/Page404.jsx';



function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/loginTeam" component={LoginTeam} />
      <Route path="/home" component={HomeUser} /> 
      <Route path="/team" component={HomeTeam} />
      <Route path="/noticias/:id*" component={Post}/>
      <Route path='*' component={Page404} />
    </Switch>
    </Router>
  );
}

export default App;
