/* Job statuses as given by the server */

// as returned by https://www.ebi.ac.uk/Tools/services/rest/ncbiblast/status/{jobId}
// as returned by https://www.ebi.ac.uk/Tools/services/rest/clustalo/status/{jobId}
export enum Status {
  NEW = 'NEW', // Specific to async-download: indicates created and queued. Id mapping does use this but we don't see it because it's never queued.
  CREATED = 'CREATED', // not from the server, for internal use
  ERRORED = 'ERRORED', // according to www-prod, for problems with the tool
  FAILURE = 'FAILURE', // according to www-prod, when something else in the pipeline failed (LSF issues, etc.)
  RUNNING = 'RUNNING',
  FINISHED = 'FINISHED',
  NOT_FOUND = 'NOT_FOUND',
}
