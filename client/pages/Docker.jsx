import React, { Component } from 'react'

import { createJob } from '../api'

export default
class Docker extends Component {
  state = {
    ligandCid: null,
    proteinId: null,
    activeJobId: null,
    activeJobResults: null,
  }

  componentDidMount() {
    this.socket = io()
    this.socket.on('jobs:docker:results', data => {
      setTimeout(() => {
        this.setState({
          activeJobId: data.jobId,
          activeJobResults: data.result
        })
      }, 0)
    })
  }

  handleChangeLigand = event => {
    this.setState({ ligandCid: event.target.value })
  }

  handleChangeProtein = event => {
    this.setState({ proteinId: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    createJob({
      ligandCid: this.state.ligandCid,
      proteinId: this.state.proteinId
    }).then(data => {
      this.setState({
        activeJobId: data.jobId,
        activeJobResults: null
      })
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Ligand CID</label>
        <input type="text" onChange={this.handleChangeLigand}/>
        <label>Receptor Protein ID</label>
        <input type="text" onChange={this.handleChangeProtein}/>
        <button type="submit">Dock</button>
        {this.state.activeJobId &&
          <div>
            <h3>Job {this.state.activeJobId}</h3>
            {this.state.activeJobResults
              ? <pre>{JSON.stringify(this.state.activeJobResults, null, 2)}</pre>
              : <span><i className="fa fa-spinner fa-spin" />Running...</span>
            }
          </div>
        }
      </form>
    )
  }
}
