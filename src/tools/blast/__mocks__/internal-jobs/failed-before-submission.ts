import { FailedJob } from '../../types/blastJob';
import { Status } from '../../types/blastStatuses';

const now = Date.now();
const ONE_MINUTE_AGO = now - 1000 * 60;
const TWO_MINUTES_AGO = now - 1000 * 60 * 2;
const THREE_MINUTES_AGO = now - 1000 * 60 * 2;

const failedAfterSubmission: FailedJob = {
  status: Status.FAILURE,
  internalID: 'local-97e5ab00-9ff0-11ea-baf5-bf14c0760688',
  remoteID: 'ncbiblast-R20200522-153245-0206-56643737-p1m',
  title: 'my job title',
  type: 'blast',
  parameters: {
    stype: 'protein',
    program: 'blastp',
    sequence: 'MLPGLALLLL',
    database: 'uniprotkb_refprotswissprot',
    taxIDs: [{ id: '9606', label: 'Homo sapiens' }],
    threshold: '10',
    matrix: 'BLOSUM62',
    filter: 'F',
    gapped: true,
    hits: 50,
  },
  timeCreated: THREE_MINUTES_AGO,
  timeSubmitted: TWO_MINUTES_AGO,
  timeLastUpdate: ONE_MINUTE_AGO,
};

export default failedAfterSubmission;
