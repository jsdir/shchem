module.exports = function mapDataToCompound(data) {
  return {
    cid: data.id.id.cid,
    data: JSON.stringify(data)
  };
}
