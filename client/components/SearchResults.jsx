import React, { PropTypes, PureComponent } from 'react'

import Compound from './Compound'

class SearchResults extends PureComponent {

  static propTypes = {
    compounds: PropTypes.arrayOf(
      PropTypes.object.isRequired
    ),
    searched: PropTypes.bool,
    index: PropTypes.number
  }

  state = { index: 0 }

  setIndex(index) {
    this.setState({ index })
  }

  renderCompound = (compound, i) => (
    <Compound key={compound.cid} compound={compound} selected={i === 0} />
  )

  render() {
    let compounds = this.props.compounds
    if (!compounds) return null

    const selectedCompound = this.props.compounds[this.state.index]
    if (selectedCompound) {
      compounds = compounds.concat([])
      compounds.splice(this.state.index, 1)
      compounds.unshift(selectedCompound)
    }

    return (
      <div className="Search__results">
        {this.props.searched && this.props.compounds.length === 0 &&
          <span>No results</span>
        }
        {compounds.map(this.renderCompound)}
      </div>
    )
  }
}

export default SearchResults
