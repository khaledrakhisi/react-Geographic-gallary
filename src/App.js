import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Places from "./places/pages/Places.jsx";
import MainNavigation from "./shared/components/navigation/MainNavigation.js";
import Users from "./users/pages/Users.jsx";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/:userId/Places" exact>
            <Places />
          </Route>

          <Route path="/" exact>
            <Users />
          </Route>

          {/* <Redirect to="/" /> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
