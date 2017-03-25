import React, { PropTypes, PureComponent } from 'react'

class JsmeEditor extends PureComponent {
  constructor() {
    super(...arguments)
    this.loadEditor = this.loadEditor.bind(this);
  }

  static propTypes = {
    onChange: React.PropTypes.func,
  }

  state = {
  };

  loadEditor() {
    const self = this;
    const editor = new JSApplet.JSME("jsme_container", "380px", "340px");
    editor.setCallBack("AfterStructureModified", (e) => {
      self.props.onChange(editor.smiles());
    });
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
