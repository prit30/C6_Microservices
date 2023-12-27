import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./LoginPage/Login";
import MainPage from "./MainPage/MainPage";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
            {/* <MainPage /> */}
          </Route>
          <Route path="/:userId/mainPage" exact>
            <MainPage />
          </Route>
        </Switch>
        <Redirect to="/"></Redirect>
      </Router>
    </>
  );
};

export default App;
