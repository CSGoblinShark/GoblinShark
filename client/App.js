import { hot } from 'react-hot-loader/root';
import UserTable from './components/usertable';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import LoginButton from './components/login';

const App = () => {

    return (
        <Router>
          <div>
            {/* <UserTable /> */}
            <Switch>
                <Route 
                    exact
                    path='/'
                    component={LoginButton}
                />
            </Switch>
          </div>
        </Router>
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