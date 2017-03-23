import React, { Component, PropTypes } from 'react'
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper'
import debounce from 'lodash/debounce'

import Compound from '../components/Compound'
import SearchResults from '../components/SearchResults'

const getResult = c => ({
  text: c.name,
  value: c.cid
})

const getDataSource = results => results.map(getResult)
const filter = () => true
const getJSON = res => res.json()

export default
class Search extends Component {
  constructor() {
    super(...arguments)
    this.debouncedHandleUpdateInput = debounce(
      this.updateInput, 100
    )
  }

  state = {
    query: null,
    results: [],
  }

  setResults = results => this.setState({ results })

  updateInput = (query) => {
    if (this.stop) {
      return
    }
    fetch(`/api/v1/compounds/query?query=${encodeURIComponent(query)}`)
      .then(getJSON)
      .then(this.setResults)
      .catch(err => {
        throw err
      })
  }

  handleUpdateInput = (query) => {
    this.stop = false
    this.debouncedHandleUpdateInput(query)
  }

  handleNewRequest = (query) => {
    this.stop = true
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
          <AutoComplete
            menuCloseDelay={0}
            fullWidth
            hintText="Search all compounds"
            dataSource={getDataSource(this.state.results)}
            onUpdateInput={this.handleUpdateInput}
            menuProps={{
              onMenuItemFocusChange: this.handleMenuItemFocusChange
            }}
            onNewRequest={this.handleNewRequest}
            animated={false}
            filter={filter}
          />
        </Paper>
        <SearchResults
          compounds={this.state.results}
          ref={this.setResultsNode}
        />
      </div>
    )
  }
}
