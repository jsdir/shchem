import React, { PropTypes, PureComponent } from 'react'

import Compound from './Compound'

class SearchResults extends PureComponent {

  static propTypes = {
    compounds: PropTypes.arrayOf(
      PropTypes.object.isRequired
    ).isRequired
  }

  state = { index: 0 }

  setIndex(index) {
    this.setState({ index })
  }

  render() {
    const compound = this.props.compounds[this.state.index]
    return (
      <div className="Search__results">
        {compound && <Compound compound={compound} />}
      </div>
    )
  }
}

export default SearchResults
