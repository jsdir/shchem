const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');

const babel = function(inType, inFile, outType, outFile, cb) {
  const cmd = `${path.join(process.env.BABEL_PATH, 'babel')} -i${inType} ${inFile} -o${outType} ${outFile}`;
  // console.log(`running: ${cmd}`);
  return cp.exec(cmd, cb);
}

module.exports.smiToPdbqt = function(inFile, outFile, cb) {
  babel('smi', inFile, 'pdbqt', outFile, cb);
};

module.exports.pdbToPdbqt = function(pdb, cb) {
  const id = crypto.randomBytes(4).toString("hex");
  const inFile = path.join(os.tmpdir(), `${id}.pdb`);
  const outFile = path.join(os.tmpdir(), `${id}.pdbqt`)
  fs.writeFileSync(inFile, pdb, 'utf-8');
  babel('pdb', inFile, 'pdbqt', outFile, () => {
    cb(fs.readFileSync(outFile).toString());
  });
};

module.exports.idock = function(inputFile, ligandDir, outputDir, cb) {
  cmd = `${path.join(process.env.IDOCK_PATH, 'idock')} --receptor ${inputFile} --ligand ${ligandDir} --out ${outputDir} --center_x 0 --center_y 0 --center_z 0 --size_x 30 --size_y 30 --size_z 30`
  // console.log(`running: ${cmd}`);
  return cp.exec(cmd, cb);
};

module.exports.tmpDir = function() {
  const id = crypto.randomBytes(4).toString("hex");
  const dir = path.join(os.tmpdir(), id);
  fs.mkdirSync(dir)
  return dir;
};
