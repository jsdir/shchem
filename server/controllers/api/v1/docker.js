const os = require("os");
const fs = require('fs');
const path = require('path');
const crypto = require("crypto");
const cp = require('child_process');
const { CompoundView, SEARCHABLE } = require('../../../models/compoundView');

const babelSmiToPdbqt = (inFile, outFile) => {
  return cp.execSync(`${path.join(process.env.BABEL_PATH, 'babel')} -ismi ${inFile} -opdbqt ${outFile}`);
};

const idock = (inputFile, ligandDir, outputDir) => {
  return cp.execSync(`${path.join(process.env.IDOCK_PATH, 'idock')} --receptor ${inputFile} --ligand ${ligandDir} --out ${outputDir} --center_x 0 --center_y 0 --center_z 0 --size_x 30 --size_y 30 --size_z 30`);
};

module.exports.dock = function(req, res) {
  CompoundView.findOne({
    cid: req.params.cid
  }).then(compound => {
    CompoundView.findAll({ limit: 3 }).then(ligands => {
      const id = crypto.randomBytes(4).toString("hex");
      const dir = path.join(os.tmpdir(), id);
      fs.mkdirSync(dir);

      const inputFile = path.join(dir, 'input.smi');
      const inputFilePdbqt = path.join(dir, 'input.pdbqt');
      fs.writeFileSync(inputFile, compound.smiles_isomeric, 'utf-8');
      babelSmiToPdbqt(inputFile, inputFilePdbqt);

      const ligandDir = path.join(dir, 'ligands');
      fs.mkdirSync(ligandDir);
      ligands.forEach(ligand => {
        const ligandFile = path.join(ligandDir, `${ligand.cid}.smi`);
        const ligandFilePdbqt = path.join(ligandDir, `${ligand.cid}.pdbqt`);
        fs.writeFileSync(ligandFile, ligand.smiles_isomeric, 'utf-8');
        babelSmiToPdbqt(ligandFile, ligandFilePdbqt);
      });

      const outputDir = path.join(dir, 'output');
      const log = idock(inputFile, ligandDir, outputDir);
      res.json({ log: log.toString('utf8') });
    });
  });
};
