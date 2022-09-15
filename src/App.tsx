import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import BlockList from "./components/BlockList/BlockList";
import BlockAdd from "./components/BlockAdd/BlockAdd";
import UserLogin from "./components/UserLogin/UserLogin";
import UserRegister from "./components/UserRegister/UserRegister";
import UserPasswordReset from "./components/UserPasswordReset/UserPasswordReset";
import UserDashboard from "./components/UserDashboard/UserDashboard";

import "./assets/scss/main.scss";

function App() {
  return (
    <div className="wrapper">
      <div>
        <Header />
        <div className="main stack-xl">
          <Router>
            <Switch>
              <Route path="/account/login">
                <UserLogin />
              </Route>
              <Route path="/account/register">
                <UserRegister />
              </Route>
              <Route path="/account/reset">
                <UserPasswordReset />
              </Route>
              <Route path="/account/dashboard">
                <UserDashboard />
              </Route>
              <Route path="/block/add">
                <BlockAdd />
              </Route>
              <Route path="/block/list">
                <BlockList />
              </Route>
              <Route>
                <UserDashboard />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;