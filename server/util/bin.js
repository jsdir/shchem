const os = require('os');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cp = require('child_process');

const babel = function(inType, inFile, outType, outFile) {
  return cp.execSync(`${path.join(process.env.BABEL_PATH, 'babel')} -i${inType} ${inFile} -o${outType} ${outFile}`);
}

module.exports.pdbToPdbqt = function(pdb) {
  const id = crypto.randomBytes(4).toString("hex");
  const inFile = path.join(os.tmpdir(), `${id}.pdb`);
  const outFile = path.join(os.tmpdir(), `${id}.pdbqt`)
  fs.writeFileSync(inFile, pdb, 'utf-8');
  babel('pdb', inFile, 'pdbqt', outFile);
  return fs.readFileSync(outFile);
}
