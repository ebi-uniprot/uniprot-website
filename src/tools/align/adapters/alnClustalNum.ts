/* eslint-disable no-continue */
/*
See the following for reference:
https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Multiple+Sequence+Alignment+Tool+Output+Examples#MultipleSequenceAlignmentToolOutputExamples-ClustalOmegaproteinoutputexamples:
http://web.mit.edu/meme_v4.11.4/share/doc/clustalw-format.html
*/

import { isEmpty } from 'lodash-es';

import { AlnClustalNum } from '../types/alignResults';

const HEADER = /^CLUSTAL.*/;
const SEQ_LINE =
  /(?<name>[^ ]+)(?<gap>\s+)(?<sequence>[^\s]+)\s+(?<count>\d+)/i;
const CONSERVATION = /^[*:.\s]+/;

const alnClustalNum = (string?: string): AlnClustalNum | null => {
  // Need a Map to preserve insertion order
  const sequences: Map<string, string> = new Map();
  let foundValidHeader = false;
  let nSequences;
  let nSequencesInBlock = 0;
  let readingSequences = false;
  let sequenceStart;
  let sequenceEnd;
  let conservation = '';

  if (!string) {
    return null;
  }

  try {
    const lines = string.split('\n');
    for (const line of lines) {
      if (
        (!line || CONSERVATION.test(line)) &&
        readingSequences &&
        !isEmpty(sequences)
      ) {
        // We've just finished reading a block of sequences so grab the conservation line
        if (typeof nSequences === 'undefined') {
          nSequences = nSequencesInBlock;
        } else if (nSequences !== nSequencesInBlock) {
          throw new SyntaxError(
            `Inconsistent number of sequences in block: ${nSequences} !== ${nSequencesInBlock}`
          );
        }

        if (
          typeof sequenceStart === 'undefined' ||
          typeof sequenceEnd === 'undefined'
        ) {
          throw new SyntaxError(`sequenceStart or sequenceEnd undefined`);
        }

        let conservationLine;
        const sequenceLength = sequenceEnd - sequenceStart + 1;
        if (!line) {
          conservationLine = ' '.repeat(sequenceLength);
        } else if (!line.startsWith(' '.repeat(sequenceStart))) {
          throw new SyntaxError(
            'Inconsistent number of spaces before conservation line'
          );
        } else {
          conservationLine = line
            .slice(sequenceStart, sequenceEnd)
            .padEnd(sequenceLength - 1);
        }
        conservation += conservationLine;
        readingSequences = false;
        nSequencesInBlock = 0;
        continue;
      }
      if (HEADER.test(line)) {
        foundValidHeader = true;
        continue;
      }
      if (foundValidHeader) {
        const mSeq = SEQ_LINE.exec(line);
        if (mSeq) {
          const name = mSeq.groups?.name;
          const sequence = mSeq.groups?.sequence;
          const count = mSeq.groups?.count;
          const gap = mSeq.groups?.gap;

          if (!(name && sequence && count && gap)) {
            throw new SyntaxError(`Malformed line:\n{line}`);
          }
          readingSequences = true;
          nSequencesInBlock += 1;
          const seq = sequences.get(name);
          if (seq) {
            sequences.set(name, seq + sequence);
          } else {
            sequences.set(name, sequence);
          }
          const lineSequenceStart = name.length + gap.length;
          const lineSequenceEnd = lineSequenceStart + sequence.length;
          if (
            typeof sequenceStart === 'undefined' ||
            typeof sequenceEnd === 'undefined'
          ) {
            sequenceStart = lineSequenceStart;
            sequenceEnd = lineSequenceEnd;
          } else if (sequenceStart !== lineSequenceStart) {
            throw new SyntaxError(
              `Inconsistent sequence column start: ${sequenceStart} !== ${lineSequenceStart}:\n${line}`
            );
          } else if (sequenceEnd < lineSequenceEnd) {
            throw new SyntaxError(
              `Inconsistent sequence column end : ${sequenceEnd} <  ${lineSequenceEnd}:\n${line}`
            );
          }
          // This needs to be updated if we're at the last block and the sequences are shorter
          sequenceEnd = lineSequenceEnd;
          continue;
        }
      }
    }
    if (!foundValidHeader) {
      throw new SyntaxError('No CLUSTAL header found in file');
    }
  } catch (error) {
    throw new SyntaxError(
      (error instanceof Error ? error : null)?.message ||
        'Error while parsing the input in aln-clustal_num format'
    );
  }
  return {
    conservation,
    sequences: Array.from(sequences.entries()).map(([name, sequence]) => ({
      name,
      sequence,
    })),
  };
};

export default alnClustalNum;
