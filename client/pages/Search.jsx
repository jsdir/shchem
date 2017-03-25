import React, { Component, PropTypes } from 'react'
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper'
import debounce from 'lodash/debounce'

import Compound from '../components/Compound'
import JsmeEditor from '../components/JsmeEditor';
import SearchResults from '../components/SearchResults'
import { searchCompounds } from '../api'

const getResult = c => ({
  text: c.name,
  value: c.cid
})

const getDataSource = results => results.map(getResult)
const filter = () => true

export default
class Search extends Component {
  constructor() {
    super(...arguments)
    this.debouncedHandleUpdateInput = debounce(
      this.updateInput, 100
    )
  }

  state = {
    loading: false,
    query: null,
    results: null
  }

  setResults = results => this.setState({
    results,
    loading: false
  })

  updateInput = (query) => {
    this.setState({ loading: true })
    searchCompounds(query).then(this.setResults)
  }

  handleUpdateInput = (query) => {
    this.debouncedHandleUpdateInput(query)
  }

  handleNewRequest = (query) => {
    console.log('handleNewRequest')
  }

  handleMenuItemFocusChange = (event, newFocusIndex) => {
    if (event) this.resultsNode.setIndex(newFocusIndex)
  }

  setResultsNode = node => {
    this.resultsNode = node
  }

  render() {
    return (
      <div className="Search">
        <Paper className="Search__query">
          <h2>Search Prototype</h2>
          <JsmeEditor />
          <div className="Search__input-row">
            <AutoComplete
              className="Search__input"
              menuCloseDelay={0}
              hintText="Search all compounds"
              dataSource={getDataSource(this.state.results || [])}
              onUpdateInput={this.handleUpdateInput}
              menuProps={{
                onMenuItemFocusChange: this.handleMenuItemFocusChange,
              }}
              onNewRequest={this.handleNewRequest}
              animated={true}
              filter={filter}
              fullWidth
            />
            <i
              style={{opacity: this.state.loading ? 1 : 0}}
              className="Search__loading fa fa-cog fa-spin"
            />
          </div>
        </Paper>
        <SearchResults
          compounds={this.state.results}
          ref={this.setResultsNode}
        />
      </div>
    )
  }
}
