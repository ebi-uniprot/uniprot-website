import { JobTypes } from '../../../../../../jobs/types/jobTypes';
import { CreatedJob } from '../../../types/job';
import { Status } from '../../../types/jobStatuses';

const ONE_MINUTE_AGO = Date.now() - 1000 * 60;

const created: CreatedJob = {
  status: Status.CREATED,
  internalID: 'local-97e5ab00-9ff0-11ea-baf5-bf14c0760612',
  title: 'my job title',
  type: JobTypes.BLAST,
  parameters: {
    stype: 'protein',
    sequence: 'MLPGLALLLL',
    program: 'blastp',
    database: 'uniprotkb_refprotswissprot',
    taxIDs: [],
    negativeTaxIDs: [],
    threshold: '1e-2',
    matrix: 'BLOSUM62',
    filter: 'T',
    gapped: true,
    hits: 20,
    hsps: undefined,
  },
  timeCreated: ONE_MINUTE_AGO,
  timeLastUpdate: ONE_MINUTE_AGO,
  saved: false,
  seen: false,
};

export default created;
