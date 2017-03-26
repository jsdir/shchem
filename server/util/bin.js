const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');

const babel = function(inType, inFile, outType, outFile) {
  return cp.execSync(`${path.join(process.env.BABEL_PATH, 'babel')} -i${inType} ${inFile} -o${outType} ${outFile}`);
}

module.exports.smiToPdbqt = function(inFile, outFile) {
  return babel('smi', inFile, 'pdbqt', outFile);
};

module.exports.pdbToPdbqt = function(pdb) {
  const id = crypto.randomBytes(4).toString("hex");
  const inFile = path.join(os.tmpdir(), `${id}.pdb`);
  const outFile = path.join(os.tmpdir(), `${id}.pdbqt`)
  fs.writeFileSync(inFile, pdb, 'utf-8');
  babel('pdb', inFile, 'pdbqt', outFile);
  return fs.readFileSync(outFile);
};

module.exports.idock = function(inputFile, ligandDir, outputDir) {
  return cp.execSync(`${path.join(process.env.IDOCK_PATH, 'idock')} --receptor ${inputFile} --ligand ${ligandDir} --out ${outputDir} --center_x 0 --center_y 0 --center_z 0 --size_x 30 --size_y 30 --size_z 30`);
};

module.exports.tmpDir = function() {
  const id = crypto.randomBytes(4).toString("hex");
  const dir = path.join(os.tmpdir(), id);
  fs.mkdirSync(dir)
  return dir;
};
