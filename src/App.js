import React, {Component} from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import {configureStore} from "./store";
import {PersistGate} from "redux-persist/integration/react";

import "./App.css";

import Main from "./containers/Main";
const {store, persistor} = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <div className="App">
              <Main />
            </div>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
