const uuid = require('uuid');
const fetch = require('node-fetch');
const queue = require('../../../queue');
const bin = require('../../../util/bin');
const { CompoundView } = require('../../../models/compoundView');
const results = require('../../../../worker/results');

module.exports.start = function(req, res) {
  const structure = req.params.structure;
  const url = `https://files.rcsb.org/download/${structure.toUpperCase()}.pdb`;
  fetch(url).then(function(fetchRes) {
    return fetchRes.buffer();
  }).then(function(buffer) {
    const pdb = buffer.toString();
    bin.pdbToPdbqt(pdb, (pdbqt) => {
      const jobId = uuid();
      CompoundView.findAll({ limit: 3 }).then(ligands => {
        ligands.forEach(ligand => {
          queue.addDockingJob({
            jobId: jobId,
            receptor: pdbqt,
            ligandCid: ligand.cid,
          }, () => {});
        });
        res.json({ jobId: jobId });
      });
    });
  });
};

module.exports.showJob = function(req, res) {
  results.getResults(req.params.id, (results) => {
    res.json(results);
  });
};
