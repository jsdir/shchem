import React, { PureComponent, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/TextField'
import Popover from 'material-ui/Popover'
import { List, ListItem } from 'material-ui/List'

import { omit } from 'lodash'

export default
class SearchInput extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    dataSource: PropTypes.array,
    onItemFocus: PropTypes.func,
  }

  state = {
    popoverOpen: false,
    focusedIndex: null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource) {
      this.setState({
        popoverOpen: true,
        focusedIndex: 0
      })
    } else {
      this.setState({ popoverOpen: false })
    }
  }

  handleChange = event => {
    this.props.onChange(event.target.value)
  }

  handleRequestClose = () => {
    this.setState({ popoverOpen: false })
  }

  handleKeyDown = event => {
    switch(event.keyCode) {
      case 38:
        event.preventDefault()
        if (this.state.focusedIndex > 0) {
          const focusedIndex = this.state.focusedIndex - 1
          this.setState({ focusedIndex })
          if (this.props.onItemFocus) {
            this.props.onItemFocus(focusedIndex)
          }
        }
        break
      case 40:
        event.preventDefault()
        if (this.state.focusedIndex < this.props.dataSource.length - 1) {
          const focusedIndex = this.state.focusedIndex + 1
          this.setState({ focusedIndex })
          if (this.props.onItemFocus) {
            this.props.onItemFocus(focusedIndex)
          }
        }
        break
    }
  }

  setTextFieldNode = node => {
    this.textFieldNode = ReactDOM.findDOMNode(node)
    // TODO: use aria-activestate for a11y
  }

  renderItem = (item, i) => (
    <ListItem
      className="SearchInput__item"
      key={item.value}
      style={{
        backgroundColor: i === this.state.focusedIndex
          ? '#B3E5FC'
          : null
      }}
    >
      {item.text}
    </ListItem>
  )

  render() {
    return (
      <span>
        <TextField
          {...omit(this.props, 'dataSource', 'onItemFocus')}
          onChange={this.handleChange}
          ref={this.setTextFieldNode}
          onKeyDown={this.handleKeyDown}
        />
        <Popover
          open={this.state.popoverOpen}
          anchorEl={this.textFieldNode}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
        >
          <List>
            {this.props.dataSource.map(this.renderItem)}
          </List>
        </Popover>
      </span>
    )
  }
}
