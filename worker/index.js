require('dotenv').config();
var queue = require('../server/queue');
const bin = require('../server/util/bin');
const { CompoundView } = require('../server/models/compoundView');
const fs = require('fs');
const path = require('path');
const results = require('./results');
const fetch = require('node-fetch');

// see https://github.com/OptimalBits/bull

queue.processStartDockingJob(function(job, done) {
  const url = `https://files.rcsb.org/download/${job.data.structure.toUpperCase()}.pdb`;
  fetch(url).then(function(fetchRes) {
    return fetchRes.buffer();
  }).then(function(buffer) {
    const pdb = buffer.toString();
    bin.pdbToPdbqt(pdb, (pdbqt) => {
      const jobId = job.data.jobId;
      CompoundView.findAll({ limit: 3 }).then(ligands => {
        ligands.forEach(ligand => {
          queue.addDockingJob({
            jobId: jobId,
            receptor: pdbqt,
            ligandCid: ligand.cid,
          }, () => {});
        });
      });
    });
  });
});


queue.processDockingJob(function(job, done) {
  console.log(`processing job ${job.data.jobId} (cid: ${job.data.ligandCid})`);

  CompoundView.findOne({
    where: { cid: job.data.ligandCid },
  }).then(ligand => {
    var dir = bin.tmpDir();

    const inputFilePdbqt = path.join(dir, 'input.pdbqt');
    fs.writeFileSync(inputFilePdbqt, job.data.receptor.toString(), 'utf-8');

    const ligandDir = path.join(dir, 'ligands');
    fs.mkdirSync(ligandDir);

    const ligandFile = path.join(ligandDir, `${ligand.cid}.smi`);
    const ligandFilePdbqt = path.join(ligandDir, `${ligand.cid}.pdbqt`);
    fs.writeFileSync(ligandFile, ligand.smiles_isomeric.toString(), 'utf-8');
    bin.smiToPdbqt(ligandFile, ligandFilePdbqt, () => {
      const outputDir = path.join(dir, 'output');
      bin.idock(inputFilePdbqt, ligandDir, outputDir, (err, stdout, stderr) => {
        const log = stdout;
        console.log(`done with job ${job.data.jobId} (cid: ${job.data.ligandCid}): ${log}`);
        var score = 0;
        results.addResult(job.data.jobId, job.data.ligandCid, score);
        done(null, { log: log.toString('utf8') });
      });
    });
  });
});

queue.processSeedJob(require('./processSeedJob'));

console.log('started shchem worker');
