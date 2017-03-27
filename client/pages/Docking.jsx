import React, { Component, PropTypes } from 'react'
import { Route, withRouter } from 'react-router'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { createJob } from '../api'
import DockingJob from './DockingJob'

class Docker extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  }

  state = {
    pdbId: null
  }

  handleChangePdbId = event => {
    this.setState({ pdbId: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    createJob(this.state.pdbId).then(this.navigateToJob)
  }

  navigateToJob = jobId => {
    this.props.history.push(`${this.props.match.url}/jobs/${jobId}`)
  }

  render() {
    return (
      <div>
        <Paper style={{ padding: 20 }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              hintText="4HHB"
              floatingLabelText="PDB ID"
              floatingLabelFixed
              onChange={this.handleChangePdbId}
            />
            <br />
            <RaisedButton
              label="Find Candidate Ligands"
              primary
              type="submit"
            />
          </form>
        </Paper>
        <Route
          path={`${this.props.match.url}/jobs/:jobId`}
          component={DockingJob}
        />
      </div>
    )
  }
}

export default withRouter(Docker)
