const _ = require('lodash');

const { PROPS } = require('../../server/models/compoundView');
const sq = require('../sq');

const columns = Object.keys(PROPS).map((key) => {
  const data = PROPS[key]
  const cond = _.chain(['name', 'label'])
    .map(dataKey => data.hasOwnProperty(dataKey)
      && `props.prop->'urn'->>'${dataKey}' = '${data[dataKey]}'`)
    .compact()
    .value()
    .join(' AND ')

  return `
    (
      SELECT
      (props.prop->'value'->>'${data.type}')${data.type === 'fval' ? '::float' : ''}
      FROM (
        SELECT json_array_elements(compounds.data->'props') prop
      ) props WHERE ${cond}
    ) AS ${key}
  `
});

const migration = `
  CREATE MATERIALIZED VIEW compounds_view AS
  SELECT
  id,
  cid,
  ${columns.join(',')},
  data
  FROM compounds
  WITH NO DATA`;

const indices = Object.keys(PROPS).map((key) => (
  () => sq.addIndex('compounds_view', [key], {
    indexName: `${key}_index`
  })
));

// TODO: Get this to not kill production
sq.query('DROP MATERIALIZED VIEW IF EXISTS compounds_view')
  .then(() => sq.query(migration))
  .then(() => sq.addIndex('compounds_view', ['cid'], { indexName: 'cid_index' }))
  .then(() => Promise.all(indices));
