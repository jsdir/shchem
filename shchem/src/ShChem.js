import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';


class ShChem extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
	  <FlatButton label="Molecule" />
	  <FlatButton label="Docker" />
	  <FlatButton label="Collab" />
	  <FlatButton label="Help" />
        </div>
      </div>
    );
  }
}

export default ShChem;
