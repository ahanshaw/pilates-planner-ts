import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from "./components/Common/Header/Header";
import { Footer } from "./components/Common/Footer/Footer";

import UserLogin from "./components/User/UserLogin/UserLogin";
import UserRegister from "./components/User/UserRegister/UserRegister";
import UserPasswordReset from "./components/User/UserPasswordReset/UserPasswordReset";
import UserDashboard from "./components/User/UserDashboard/UserDashboard";

import Blocks from "./components/Blocks/Blocks/Blocks";
import BlockAdd from "./components/Blocks/BlockAdd/BlockAdd";

import WorkoutAdd from "./components/Workouts/WorkoutAdd/WorkoutAdd";

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
                <Blocks />
              </Route>
              <Route path="/workouts/add">
                <WorkoutAdd />
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