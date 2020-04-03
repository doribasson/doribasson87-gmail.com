import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./components/App";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import Header from "./components/Header";
import Favorite from "./components/Favorite";
// import createBrowserHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router-dom";

// const store = createStore(rootReducer, compose( applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    {/* <Router history={createBrowserHistory()}> */}
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Header>
              <App />
            </Header>
          )}
        />
        <Route
          path="/favorite"
          render={() => (
            <Header>
              <Favorite />
            </Header>
          )}
        />
        {/* <Route path='/favorite' component={Favorite} /> */}
      </Switch>
    </Router>
    ,
  </Provider>,
  document.getElementById("root")
);
