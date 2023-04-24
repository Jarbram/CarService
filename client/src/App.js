import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './/pages/login/Login.jsx';
import SignUp from './/pages/signup/SignUp.jsx';
import Home from './/pages/home/Home.jsx';
import HomeUser from './/pages/homeUser/HomeUser.jsx';
import Post from './/pages/post/Post.jsx';


function App() {
  return (
    <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/home" component={HomeUser} /> 
      <Route path="/noticias/:id*" component={Post}/>
    </Switch>
    </Router>
  );
}

export default App;
