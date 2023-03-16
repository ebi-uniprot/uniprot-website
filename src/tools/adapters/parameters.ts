import { sequenceProcessor } from 'franklin-sites';

import * as logging from '../../shared/utils/logging';

import {
  ServerParameters,
  PublicServerParameters,
} from '../types/toolsServerParameters';
import { FormParameters } from '../types/toolsFormParameters';
import { JobTypes } from '../types/toolsJobTypes';
import { SelectedTaxon } from '../types/toolsFormData';

const DEFAULT_EMAIL = 'uuw_dev@uniprot.org';

type ObjectForFormData = Record<string, string | number | boolean | undefined>;

const objectToFormData = (object: ObjectForFormData) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(object)) {
    if (value !== undefined) {
      formData.append(key, String(value));
    }
  }
  return formData;
};

const stringifyTaxa = (taxa?: SelectedTaxon[]) =>
  taxa?.map(({ id }) => id).join(',');

const parseTaxa = (
  string = '',
  taxonMapping: Map<string, string> = new Map()
): SelectedTaxon[] => {
  const taxa = [];
  for (const taxid of string.split(',')) {
    const cleaned = taxid.trim();
    if (!cleaned) {
      continue; // eslint-disable-line no-continue
    }
    taxa.push({
      id: cleaned,
      label: taxonMapping.get(cleaned) || cleaned,
    });
  }
  return taxa;
};

/**
 * Takes an object containing parameters as defined for the website's form, to
 * shape it to an object containing parameters expected by the server (as FormData)
 * @param {T extends JobTypes} type
 * @param {FormParameters[T]} formParameters
 * @returns {FormData | URLSearchParams} server parameters wrapped in a FormData
 */
export function formParametersToServerParameters<T extends JobTypes>(
  type: T,
  formParameters: FormParameters[T]
): FormData | URLSearchParams {
  let serverParameters: Partial<ServerParameters[T]> = {};
  switch (type) {
    case JobTypes.ALIGN:
      {
        const { sequence, order, iterations } =
          formParameters as FormParameters[JobTypes.ALIGN];
        serverParameters = {
          email: DEFAULT_EMAIL,
          outfmt: 'clustal_num',
          addformats: true,
          guidetreeout: true,
          // from form
          sequence,
          order,
          iterations,
        } as ServerParameters[T];
      }
      break;
    case JobTypes.BLAST:
      {
        const {
          program,
          matrix,
          hits,
          threshold,
          filter,
          gapped,
          taxIDs,
          negativeTaxIDs,
          stype,
          sequence,
          database,
          hsps,
        } = formParameters as FormParameters[JobTypes.BLAST];

        serverParameters = {
          email: DEFAULT_EMAIL,
          // from form
          program,
          matrix,
          alignments: hits,
          scores: hits,
          exp: threshold,
          filter,
          gapalign: gapped,
          taxids: stringifyTaxa(taxIDs),
          negative_taxids: stringifyTaxa(negativeTaxIDs),
          stype,
          sequence,
          database,
          hsps,
        } as ServerParameters[T];
      }
      break;
    case JobTypes.ID_MAPPING:
      {
        const { from, to, ids, taxId } =
          formParameters as FormParameters[JobTypes.ID_MAPPING];
        serverParameters = {
          from,
          to,
          ids: ids.join(','),
          taxId: taxId?.id,
        } as ServerParameters[T];
      }
      break;
    case JobTypes.PEPTIDE_SEARCH: {
      const { peps, taxIds, lEQi, spOnly } =
        formParameters as FormParameters[JobTypes.PEPTIDE_SEARCH];
      serverParameters = {
        // replace any white space with a FASTA comment line before processing
        peps: sequenceProcessor(peps.split(/\s+/).join('\n>\n'))
          .map((processedSequence) => processedSequence.sequence)
          .filter((s) => s.trim()) // Filter out empty lines
          .join(','),
        taxIds: stringifyTaxa(taxIds) || '',
        lEQi,
        // not available on current endpoint
        spOnly,
      } as ServerParameters[T];
      return new URLSearchParams(Object.entries(serverParameters));
    }
    /* istanbul ignore next */
    default:
      logging.warn(`Forgot to implement for ${type}`);
  }

  return objectToFormData(serverParameters as ServerParameters[T]);
}

/**
 * Takes an object containing parameters as defined for the server, to shape it
 * to an object containing parameters expected by the website's form
 * @param {T extends JobTypes} type
 * @param {PublicServerParameters[T]} formParameters
 * @returns {FormParameters[T]} website form parameters
 */
export function serverParametersToFormParameters<T extends JobTypes>(
  type: T,
  serverParameters: PublicServerParameters[T],
  taxonMapping: Map<string, string> = new Map()
): FormParameters[T] {
  let formParameters: Partial<FormParameters[T]> = {};
  switch (type) {
    case JobTypes.ALIGN:
      {
        const { sequence, order, iterations } =
          serverParameters as PublicServerParameters[JobTypes.ALIGN];

        formParameters = {
          sequence,
          order,
          iterations,
        } as FormParameters[T];
      }
      break;
    case JobTypes.BLAST:
      {
        const {
          program,
          matrix,
          scores,
          alignments,
          exp,
          filter,
          gapalign,
          taxids,
          // eslint-disable-next-line camelcase
          negative_taxids,
          stype,
          sequence,
          database,
          hsps,
        } = serverParameters as PublicServerParameters[JobTypes.BLAST];

        if (scores !== alignments) {
          logging.warn(
            `mismatch between number of scores (${scores}) and number of alignments (${alignments})`
          );
        }

        formParameters = {
          program,
          matrix,
          hits: +scores as FormParameters[JobTypes.BLAST]['hits'],
          threshold: exp,
          filter,
          gapped: Boolean(gapalign),
          taxIDs: parseTaxa(taxids, taxonMapping),
          negativeTaxIDs: parseTaxa(negative_taxids, taxonMapping),
          stype,
          sequence,
          database,
          hsps,
        } as FormParameters[T];
      }
      break;
    case JobTypes.ID_MAPPING:
      {
        const { from, to, ids, taxId } =
          serverParameters as PublicServerParameters[JobTypes.ID_MAPPING];

        formParameters = {
          from,
          to,
          ids: ids.split(','),
          taxId, // TODO: check
        } as FormParameters[T];
      }
      break;
    case JobTypes.PEPTIDE_SEARCH:
      formParameters = {
        ...(serverParameters as ServerParameters[JobTypes.PEPTIDE_SEARCH]),
      } as FormParameters[T];
      break;
    /* istanbul ignore next */
    default:
      logging.warn(`Forgot to implement for ${type}`);
  }

  return formParameters as FormParameters[T];
}
