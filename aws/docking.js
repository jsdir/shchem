const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const csvParse = require('csv-parse/lib/sync');
const bin = require('./bin');
const s3 = require('./s3');

const receptor = process.argv[2];
const cids = process.argv[3].split(',');
console.log(`processing job for ${receptor} (cids: ${cids})`);

const getReceptorPdbqt = function(cb) {
  const receptorKey = `receptors/${receptor}.pdbqt`;
  s3.fetch(receptorKey, (data) => {
    if (data) { return cb(data); }

    const url = `https://files.rcsb.org/download/${receptor}.pdb`;
    fetch(url).then((fetchRes) => {
      return fetchRes.buffer();
    }).then((buffer) => {
      const pdb = buffer.toString();
      bin.pdbToPdbqt(pdb, (pdbqt) => {
        s3.put(receptorKey, pdbqt, () => {
          cb(pdbqt);
        });
      });
    });
  });
};

const getSmiles = function(ligand) {
  const prop = ligand.props.find((prop) => {
    return prop.urn.label == 'SMILES' &&
           prop.urn.name == 'Canonical';
  });
  if (prop) { return prop.value.sval; }
  return null;
};

getReceptorPdbqt(function (receptorPdbqt) {
  var dir = bin.tmpDir();

  const inputFilePdbqt = path.join(dir, 'input.pdbqt');
  fs.writeFileSync(inputFilePdbqt, receptorPdbqt, 'utf-8');

  const ligandDir = path.join(dir, 'ligands');
  fs.mkdirSync(ligandDir);

  Promise.all(cids.map((cid) => {
    return new Promise((cb) => {
      const ligandFilePdbqt = path.join(ligandDir, `${cid}.pdbqt`);
      const compoundPdbqtKey = `compounds/pdbqt/${cid}.pdbqt`;
      s3.fetch(compoundPdbqtKey, (data) => {
        if (data) {
          fs.writeFileSync(ligandFilePdbqt, data, 'utf-8');
          cb();
        }
        else {
          const compoundKey = `compounds/json/${cid}.json`;
          s3.fetch(compoundKey, (data) => {
            if (data) {
              const ligand = JSON.parse(data);
              const smiles = getSmiles(ligand);
              if (smiles) {
                const ligandFile = path.join(ligandDir, `${cid}.smi`);
                fs.writeFileSync(ligandFile, smiles, 'utf-8');
                return bin.smiToPdbqt(ligandFile, ligandFilePdbqt, () => {
                  data = fs.readFileSync(ligandFilePdbqt);
                  s3.put(compoundPdbqtKey, data, cb);
                });
              }
            }
            cb();
          });
        }
      });
    });
  })).then(() => {
    const outputDir = path.join(dir, 'output');
    console.log(`docking ${receptor} (cid: ${cids})`);
    bin.idock(inputFilePdbqt, ligandDir, outputDir, (err, stdout, stderr) => {
      const log = stdout;
      console.log(`done with job ${receptor} (cid: ${cids}): ${log}`);

      var score = 0;
      try {
        const logFile = path.join(outputDir, 'log.csv');
        const logCsv  = fs.readFileSync(logFile).toString('utf-8');
        const csvData = csvParse(logCsv);
        score = parseFloat(csvData[1][2]);
      } catch (e) {}
    });
  });
});
