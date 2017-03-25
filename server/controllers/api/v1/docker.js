const os = require("os");
const fs = require('fs');
const path = require('path');
const crypto = require("crypto");
const cp = require('child_process');
const { CompoundView, SEARCHABLE } = require('../../../models/compoundView');

const babelSmiToPdbqt = (inFile, outFile) => {
  cp.execSync(`${path.join(process.env.BABEL_PATH, 'babel')} -ismi ${inFile} -opdbqt ${outFile}`);
};

module.exports.dock = function(req, res) {
  CompoundView.findOne({
    cid: req.params.cid
  }).then(compound => {
    CompoundView.findAll({ limit: 10 }).then(ligands => {
      const id = crypto.randomBytes(4).toString("hex");
      const dir = path.join(os.tmpdir(), id);
      fs.mkdirSync(dir);

      const inputFile = path.join(dir, 'input.smi');
      const inputFilePdbqt = path.join(dir, 'input.pdbqt');
      fs.writeFileSync(inputFile, compound.smiles_isomeric, 'utf-8');
      babelSmiToPdbqt(inputFile, inputFilePdbqt);

      const ligandDir = path.join(dir, 'output');
      fs.mkdirSync(ligandDir);
      ligands.forEach(ligand => {
        const ligandFile = path.join(ligandDir, `${ligand.cid}.smi`);
        const ligandFilePdbqt = path.join(ligandDir, `${ligand.cid}.pdbqt`);
        fs.writeFileSync(ligandFile, ligand.smiles_isomeric, 'utf-8');
        babelSmiToPdbqt(ligandFile, ligandFilePdbqt);
      });

      res.json({ success: true });
    });
  });
};
