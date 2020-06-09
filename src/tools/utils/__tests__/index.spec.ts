import getServerErrorDescription from '../';

describe('getServerErrorDescription', () => {
  it('should get formatted error string from server error', () => {
    const data = `<?xml version='1.0' encoding='UTF-8'?>
    <error>
      <description>Invalid parameters: 
        Sequence -> Error in reading input sequence. Please check your input.</description>
    </error>`;
    const error = { response: { data } };
    expect(getServerErrorDescription(error)).toEqual(`Invalid parameters: 
        Sequence → Error in reading input sequence. Please check your input.`);
  });
});
