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

import Molecules from './pages/Molecules';
import Docker from './pages/Docker';
import Search from './pages/Search';

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
              label="Molecule"
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
          <Route exact path="/" component={Molecules} />
          <Route exact path="/docker" component={Docker} />
          <Route exact path="/search" component={Search} />
        </div>
      </Router>
    );
  }
}

export default ShChem;
