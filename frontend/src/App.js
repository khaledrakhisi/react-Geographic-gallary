import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import NewPlace from "./places/pages/NewPlace";
import Places from "./places/pages/Places";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import Users from "./users/pages/Users";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth.jsx";
import { AuthContext } from "./shared/components/context/Auth-context";

function App() {
  const [loggedinUser, setLoggedinUser] = useState(null);

  const login = useCallback((user) => {
    setLoggedinUser(user);
  }, []);

  const logoff = useCallback(() => {
    setLoggedinUser(false);
  }, []);

  let routes;
  if (loggedinUser) {
    routes = (
      <Switch>   
        <Route path="/" exact>
          <Users />
        </Route>  

        <Route path="/Places/user/:userId" exact>
          <Places />
        </Route>  

        <Route path="/places/new" exact>
          <NewPlace />
        </Route>

        <Route path="/places/:placeId" exact>
          <UpdatePlace />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>      

        <Route path="/Places/user/:userId" exact>
          <Places />
        </Route>  

        <Route path="/auth" exact>
          <Auth />
        </Route>
        
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ loggedinUser : loggedinUser, login: login, logoff: logoff }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>

    </AuthContext.Provider>
  );
}

export default App;
