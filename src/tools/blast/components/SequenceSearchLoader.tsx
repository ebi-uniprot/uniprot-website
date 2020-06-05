import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
import { SearchInput } from 'franklin-sites';
import queryString from 'query-string';

import useDataApi from '../../../shared/hooks/useDataApi';

import uniProtKBApiUrls from '../../../uniprotkb/config/apiUrls';

import { uniProtKBAccessionRegEx } from '../../../uniprotkb/utils';

import { APISequenceData } from '../types/apiSequenceData';

// const CHUNK_OF_TEXT_OF_SIXTY_CHARACTERS = /(.{1,60})/g;
// const CHUNK_OF_TEXT_OF_TEN_CHARACTERS = /(.{1,10})/g;

const getURLForAccessionOrID = (input: string) => {
  const cleanedInput = input.trim();
  if (!cleanedInput) {
    return null;
  }

  const query = queryString.stringify({
    query: uniProtKBAccessionRegEx.test(cleanedInput)
      ? `accession:${cleanedInput}`
      : `id:${cleanedInput}`,
    fields:
      'sequence,id,reviewed,protein_name,organism_name,protein_existence,sequence_version',
  });

  return `${uniProtKBApiUrls.search}?${query}`;
};

export type SequenceSubmissionOnChangeEvent = {
  sequence: string;
  valid: boolean;
  likelyType: 'na' | 'aa' | null;
  message: string | null;
  name?: string;
};

const SequenceSearchLoader: FC<{
  onLoad: (event: SequenceSubmissionOnChangeEvent) => void;
}> = ({ onLoad }) => {
  const [accessionOrID, setAccessionOrID] = useState('');

  // used to keep a reference to the previously generated sequence string
  const sequenceRef = useRef('');

  const urlForAccessionOrID = getURLForAccessionOrID(accessionOrID);
  const { data, loading } = useDataApi(urlForAccessionOrID || '');

  const topResult: APISequenceData | null = data?.results?.[0];

  // no new result, probably invalid query, reset ref
  if (!topResult) {
    sequenceRef.current = '';
  }

  useEffect(() => {
    if (!topResult) {
      return;
    }

    if (urlForAccessionOrID && !topResult) {
      onLoad({
        sequence: '',
        valid: false,
        likelyType: null,
        message: null,
      });
      return;
    }

    let newSequence = topResult.sequence.value || '';
    // NOTE: if we decide to do formatting here, use formatting logic from franklin
    // .split(CHUNK_OF_TEXT_OF_SIXTY_CHARACTERS)
    // .filter(Boolean)
    // .map((line) =>
    //   line.replace(CHUNK_OF_TEXT_OF_TEN_CHARACTERS, '$1 ').trim()
    // )
    // .join('\n');
    // build a "nicely"-formatted FASTA string
    // See https://www.uniprot.org/help/fasta-headers for current headers
    try {
      const db = topResult.entryType.includes('unreviewed') ? 'tr' : 'sp';
      const proteinName =
        topResult.proteinDescription.recommendedName.fullName.value;
      const os = topResult.organism.scientificName;
      const ox = topResult.organism.taxonId;
      let optionalGN = '';
      if (topResult.genes?.[0]?.geneName?.value) {
        optionalGN = `GN=${topResult.genes[0].geneName.value} `;
      }
      const pe = topResult.proteinExistence[0];
      const sv = topResult.entryAudit.sequenceVersion;
      newSequence = `>${db}|${topResult.primaryAccession}|${topResult.uniProtkbId} ${proteinName} OS=${os} OX=${ox} ${optionalGN}PE=${pe} SV=${sv}\n${newSequence}`;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    if (newSequence === sequenceRef.current) {
      // if the new generated sequence would be the same than the previously
      // generated one, don't do anything
      // we must have end up here because something else update (e.g. the user
      // manually updated the sequence)
      return;
    }

    // set ref to the value of the sequence we are about to set
    sequenceRef.current = newSequence;

    onLoad({
      sequence: newSequence,
      valid: true,
      likelyType: null,
      message: null,
      name: topResult.primaryAccession || accessionOrID,
    });
  }, [topResult, onLoad, urlForAccessionOrID, accessionOrID]);

  return (
    <SearchInput
      isLoading={loading}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setAccessionOrID(e.target.value)
      }
      placeholder="P05067, A4_HUMAN, UPI0000000001"
      value={accessionOrID}
    />
  );
};

export default SequenceSearchLoader;
