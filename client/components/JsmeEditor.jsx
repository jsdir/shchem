import React, { PropTypes, PureComponent } from 'react'

class JsmeEditor extends PureComponent {

  static propTypes = {
  }

  state = {
  };

  loadEditor() {
    new JSApplet.JSME("jsme_container", "380px", "340px");
  }

  componentDidMount() {
    if (typeof(JSApplet) == 'undefined') {
      window.jsmeOnLoad = this.loadEditor;
    }
    else {
      loadEditor();
    }
  }

  render() {
    return (
      <div id="jsme_container"></div>
    )
  }
}

export default JsmeEditor;
