// uuid serializer
// see https://jestjs.io/docs/en/configuration#snapshotserializers-arraystring

const uuidRE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

module.exports = {
  print() {
    return '"<UUID>"';
  },

  test(val) {
    return val && typeof val === 'string' && uuidRE.test(val);
  },
};
