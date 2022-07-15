export default {
  from: 'UniProtKB_AC-ID',
  to: 'GI_number',
  ids: 'A0A024B7W1,A0A024RBG1,and many more',
  errors: [
    {
      code: 40,
      message:
        'Id Mapping API is not supported for mapping results with "mapped to" IDs more than 500000',
    },
  ],
};
