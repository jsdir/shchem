import React, { Component, PropTypes } from 'react'

import { getJob } from '../api'

export default
class DockingJob extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        jobId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }

  state = {
    job: null
  }

  componentDidMount() {
    this.reload()
    setInterval(this.reload, 5000)
  }

  reload = () => {
    getJob(this.props.match.params.jobId).then(
      job => this.setState({ job })
    )
  }

  render() {
    if (!this.state.job) {
      return (
        <span>
          <i className="fa fa-spinner fa-spin"/>
          {' '}
          Loading
        </span>
      )
    }

    return (
      <pre>{JSON.stringify(this.props, null, 2)}</pre>
    )
  }
}
