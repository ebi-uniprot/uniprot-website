import { FinishedJob } from '../../types/blastJob';
import { Status } from '../../types/blastStatuses';

const now = Date.now();
const ONE_MINUTE_AGO = now - 1000 * 60;
const TWO_MINUTES_AGO = now - 1000 * 60 * 2;
const THREE_MINUTES_AGO = now - 1000 * 60 * 2;

const finished: FinishedJob = {
  status: Status.FINISHED,
  internalID: 'local-97e5ab00-9ff0-11ea-baf5-bf14c0760912',
  remoteID: 'ncbiblast-R20200522-953240-6266-96643739-p1m',
  title: 'my job title',
  type: 'blast',
  parameters: {
    type: 'protein',
    sequence: 'MLPGLALLLL',
    database: 'uniprotkb_refprotswissprot',
    taxIDs: '9606',
    threshold: '10',
    matrix: 'BLOSUM62',
    filter: 'F',
    gapped: true,
    hits: 50,
  },
  timeCreated: THREE_MINUTES_AGO,
  timeSubmitted: TWO_MINUTES_AGO,
  timeFinished: ONE_MINUTE_AGO,
  timeLastUpdate: ONE_MINUTE_AGO,
};

export default finished;
