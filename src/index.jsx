import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

//Main component
class MyFlixApplication extends React.Component {
  render() {
    // forces Parcel to reload
    if (module.hot) {
      module.hot.accept()
    }
    return (
      <Provider store={store}>
        <Container className="main-container">
          <MainView />
        </Container>
      </Provider>
    );
  }
}


//Finds root of app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in the root DOM element 
ReactDOM.render(React.createElement(MyFlixApplication), container);