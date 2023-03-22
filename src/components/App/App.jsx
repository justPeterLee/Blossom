import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../../notneeded/Nav/Nav";
import Footer from "../Footer/Footer";
import Layout from "../Layout/Layout";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../Pages/AboutPage/AboutPage";
import UserPage from "../Pages/UserPage/UserPage";
import InfoPage from "../Pages/InfoPage/InfoPage";
import LandingPage from "../../notneeded/LandingPage/LandingPage";
import LoginPage from "../Login/LoginPage/LoginPage";
import RegisterPage from "../Login/RegisterPage/RegisterPage";
import LogOutButton from "../Layout/LogOutButton/LogOutButton";
import Home from "../Pages/Home/Home";

import "./App.css";
import Garden from "../Pages/Garden/Garden";
import Plants from "../Pages/Plants/Plants";
import GardenFilter from "../Pages/GardenFilter/GardenFilter";
import Details from "../Pages/Details/Details";
import UpdatePlant from "../Pages/UpdatePlant/UpdatePlant";
import AddPlant from "../Pages/AddPlant/AddPlant";
import AddGarden from "../Pages/AddGarden/AddGarden";
import BackdropOverlay from "../../Portal/Backdrop/Backdrop";
import FeatureGardenPage from "../Pages/Home/FeatureGardenPage/FeatureGardenPage";
import Tech from "../Pages/Tech/Tech";
function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <BackdropOverlay/>
      <Layout auth={user.id}>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* create pages */}

          {/* home page */}
          <ProtectedRoute exact path="/home">
            <Home />
          </ProtectedRoute>

          {/* garden page */}
          <ProtectedRoute exact path="/garden">
            <Garden />
          </ProtectedRoute>

          {/* Plant by Garden */}
          <ProtectedRoute exact path="/garden/filter/:id">
            <GardenFilter />
          </ProtectedRoute>





          {/* plants page */}
          <ProtectedRoute exact path="/plants">
            <Plants />
          </ProtectedRoute>

          {/* detail page */}
          <ProtectedRoute exact path="/plant/detail/:id">
            <Details/>
          </ProtectedRoute>


          {/* upadte plant */}
          <ProtectedRoute exact path="/plant/update/:id">
            <UpdatePlant/>
          </ProtectedRoute>


          {/* add plant */}
          <ProtectedRoute exact path="/plant/create">
            <AddPlant/>
          </ProtectedRoute>

          {/* add garden */}
          <ProtectedRoute exact path="/garden/create">
            <AddGarden/>
          </ProtectedRoute>

          {/* user page */}
          <ProtectedRoute exact path="/user">
            <UserPage/>
          </ProtectedRoute>

          {/* tech page */}

          <Route exact path='/tech'>
            <Tech/>
          </Route>
          {/* feature garden page */}
          <ProtectedRoute exact path="/garden/feature">
            <FeatureGardenPage/>
          </ProtectedRoute>
          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/home" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </Layout>
    </Router>
  );
}

export default App;
