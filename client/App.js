import { hot } from 'react-hot-loader/root';
import UserTable from './components/usertable';
import { Switch, Route } from "react-router-dom";
import LoginButton from './components/login.jsx';
import Signup from './components/Signup.jsx';

const App = () => {

  return (
    <div id='body'>
      <Switch>
          <Route 
              exact
              path='/'
              component={LoginButton}
          />
          <Route
              exact
              path='/signup'
              component={Signup}
          />
          <Route
              exact
              path='/home'
              component={UserTable}
          />
      </Switch>
    </div>
  )
}
/*
<Router>
<div>
<ul>
  <li>
    <Link to="/">Home</Link>
  </li>     
  <li>
    <Link to="/about">About</Link>
  </li>
  <li>
    <Link to="/topics">Topics</Link>
  </li>
</ul>

<Switch>
  <Route path="/about">
    <About />
  </Route>
  <Route path="/topics">
    <Topics />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Switch>
</div>
</Router>
);
}

function Home() {
return <h2>Home</h2>;
}

function About() {
return <h2>About</h2>;
}
*/

export default hot(App);