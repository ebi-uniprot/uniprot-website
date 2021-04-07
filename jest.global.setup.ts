module.exports = async () => {
  // Force time zone to be UTC during tests
  process.env.TZ = 'UTC';
};
