const listFormat = (
  currentIndex: number,
  { length }: { length: number },
  conjunction: 'and' | 'or' = 'and'
) => {
  if (currentIndex === 0) {
    return '';
  }
  if (currentIndex === 1 && length === 2) {
    return ` ${conjunction} `;
  }
  if (currentIndex > 0 && currentIndex === length - 1) {
    return `, ${conjunction} `;
  }
  return ', ';
};

export default listFormat;
