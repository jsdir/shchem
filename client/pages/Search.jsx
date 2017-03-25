import React, { Component, PropTypes } from 'react'
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper'
import debounce from 'lodash/debounce'

import Compound from '../components/Compound'
import JsmeEditor from '../components/JsmeEditor';
import SearchResults from '../components/SearchResults'
import SearchInput from '../components/SearchInput'
import { searchCompounds } from '../api'

const renderMatch = (c) => {
  if (!c.match) return c.name
  const { match: { startIndex, endIndex } } = c
  const text = c[c.match.prop]
  return (
    <span>
      <span>{text.substring(0, startIndex)}</span>
      <span className="Search__match">
        {text.substring(startIndex, endIndex)}
      </span>
      <span>{text.substring(endIndex)}</span>
    </span>
  )
}
const getResult = c => ({
  text: renderMatch(c),
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

  handleItemFocus = (index) => {
    this.resultsNode.setIndex(index)
  }

  setResultsNode = node => {
    this.resultsNode = node
  }

  onEditorChange = smiles => {
    this.updateInput(smiles);
  };

  render() {
    return (
      <div className="Search">
        <Paper className="Search__query">
          <h2>Search Prototype</h2>
          <JsmeEditor onChange={this.onEditorChange} />
          <div className="Search__input-row">
            <SearchInput
              className="Search__input"
              hintText="Search all compounds"
              dataSource={getDataSource(this.state.results || [])}
              onChange={this.handleUpdateInput}
              onItemFocus={this.handleItemFocus}
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
