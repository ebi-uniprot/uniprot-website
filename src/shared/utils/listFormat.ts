const listFormat = (currentIndex: number, { length }: { length: number }) => {
  if (currentIndex === 0) {
    return '';
  }
  if (currentIndex === 1 && length === 2) {
    return ' and ';
  }
  if (currentIndex > 0 && currentIndex === length - 1) {
    return ', and ';
  }
  return ', ';
};

export default listFormat;
