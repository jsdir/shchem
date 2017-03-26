import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Home from './pages/Home';
import Search from './pages/Search';
import Docker from './pages/Docker';
import Collab from './pages/Collab';
import Help from './pages/Help';

import './styles/style.css';

class ShChem extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <FlatButton
              backgroundColor="#d3c324"
              hoverColor="#a6c325"
              label="Home"
              containerElement={<Link to="/" />}
            />
            <FlatButton
              backgroundColor="#d3c324"
              hoverColor="#a6c325"
              label="Search"
              containerElement={<Link to="/search" />}
            />
            <FlatButton
              backgroundColor="#d3c324"
              hoverColor="#a6c325"
              label="Docker"
              containerElement={<Link to="/docker" />}
            />
            <FlatButton
              backgroundColor="#d3c324"
              hoverColor="#a6c325"
              label="Collab"
              containerElement={<Link to="/collab" />}
            />
            <FlatButton
              backgroundColor="#d3c324"
              hoverColor="#a6c325"
              label="Help"
              containerElement={<Link to="/help" />}
            />
          </div>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/docker" component={Docker} />
          <Route exact path="/collab" component={Collab} />
          <Route exact path="/help" component={Help} />
        </div>
      </Router>
    );
  }
}

export default ShChem;
