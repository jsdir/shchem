import React, { Component, PropTypes } from 'react'
import LinearProgress from 'material-ui/LinearProgress'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

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
    getJob(this.props.match.params.jobId).then(job => {
      this.setState({ job })
    })
  }

  renderResult(result) {
    return (
      <TableRow key={result.ligandCid}>
        <TableRowColumn>{result.ligandCid}</TableRowColumn>
        <TableRowColumn>{result.score}</TableRowColumn>
      </TableRow>
    )
  }

  render() {
    const { job } = this.state

    if (!job) {
      return (
        <CircularProgress />
      )
    }

    return (
      <Paper>
        <div>Status: {job.done ? 'Done' : 'Processing'}</div>
        <LinearProgress
          mode="determinate"
          max={1}
          value={job.percent}
        />
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Ligand CID</TableHeaderColumn>
              <TableHeaderColumn>Score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {job.results.map(this.renderResult)}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}
