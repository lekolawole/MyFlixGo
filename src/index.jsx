import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

// Import statement when bundling
import './index.scss';

//Main component
class MyFlixApplication extends React.Component {
  render() {
    
    return (
      <Container className="main-container">
        <MainView />
      </Container>
    );
  }
}


//Finds root of app
const container = document.getElementsByClassName('app-container')[0];

//Tells React to render app in the root DOM element 
ReactDOM.render(React.createElement(MyFlixApplication), container);