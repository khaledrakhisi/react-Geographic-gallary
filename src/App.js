import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  
} from "react-router-dom";
import NewPlace from "./places/pages/NewPlace.jsx";
import Places from "./places/pages/Places.jsx";
import MainNavigation from "./shared/components/navigation/MainNavigation.jsx";
import Users from "./users/pages/Users.jsx";
import UpdatePlace from "./places/pages/UpdatePlace.jsx";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/:userId/Places" exact>
            <Places />
          </Route>

          <Route path="/places/new" exact>
            <NewPlace />
          </Route>

          <Route path="/places/:placeId" exact>
            <UpdatePlace />
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
