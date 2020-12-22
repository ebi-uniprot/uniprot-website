// alphabetical sort helper
const intlCollator = new Intl.Collator('en-UK', {
  // a ≠ b, a ≠ á, a = A
  sensitivity: 'accent',
  // "1" < "2" < "10"
  numeric: true,
});

export default intlCollator;
