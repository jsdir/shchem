const chai = require('chai')
const server = require('../../server')

describe('compounds controller', () => {
  describe('GET', () => {
    it('works', () => {
      chai.request(server)
        .get('/api/v1/compounds')
        .end((err, res) => {
          res.should.have.status(200)
        })
    })
  })

  describe('GET search', () => {
    it('works', () => {
      chai.request(server)
        .get('/api/v1/compounds/query?query=a')
        .end((err, res) => {
          res.should.have.status(200)
        })
    })
  })
})
