module.exports = async () => {
  // Force time zone to be UTC during tests
  process.env.TZ = 'UTC';
};

// // WIP: mock franklin component
// jest.mock('franklin-sites', () => {
//   const RealFranklin = jest.requireActual('franklin-sites');
//   const MockedFranklin = {
//     __esModule: true,
//     ...RealFranklin,
//     Loader: () => '{{ Franklin Loader }}',
//     ...Object.fromEntries(
//       Object.keys(RealFranklin)
//         .filter((name) => name.endsWith('Icon'))
//         .map((name) => [name, () => `{{ Franklin ${name} }}`])
//     ),
//   };
//   return MockedFranklin;
// });
