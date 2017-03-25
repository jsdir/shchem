const os = require("os");
const fs = require('fs');
const path = require('path');
const crypto = require("crypto");
const { CompoundView, SEARCHABLE } = require('../../../models/compoundView');

module.exports.dock = function(req, res) {
  CompoundView.findOne({
    cid: req.params.cid
  }).then(compound => {
    CompoundView.findAll({ limit: 10 }).then(ligands => {
      const id = crypto.randomBytes(4).toString("hex");
      const dir = path.join(os.tmpdir(), id);
      fs.mkdirSync(dir);

      const inputFile = path.join(dir, 'input.smi');
      fs.writeFileSync(inputFile, compound.smiles_isomeric, 'utf-8');

      const ligandDir = path.join(dir, 'output');
      fs.mkdirSync(ligandDir);
      ligands.forEach(ligand => {
        const ligandFile = path.join(ligandDir, `${ligand.cid}.smi`);
        fs.writeFileSync(ligandFile, ligand.smiles_isomeric, 'utf-8');
      });

      res.json({ success: true });
    });
  });
};
