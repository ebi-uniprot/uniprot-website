import {
  formParametersToServerParameters,
  serverParametersToFormParameters,
} from '../parameters';

import { FormParameters } from '../../types/toolsFormParameters';
import { PublicServerParameters } from '../../types/toolsServerParameters';
import { JobTypes } from '../../types/toolsJobTypes';

describe('tools adapter tests', () => {
  describe('Align', () => {
    describe('formParametersToServerParameters', () => {
      it('should translate align parameters accurately', () => {
        const formParams: FormParameters[JobTypes.ALIGN] = {
          sequence: 'ATGC',
          order: 'input',
          iterations: 0,
        };

        const formData = formParametersToServerParameters(
          JobTypes.ALIGN,
          formParams
        );

        expect(Array.from(formData.entries())).toEqual([
          ['email', 'uuw_dev@uniprot.org'],
          ['outfmt', 'clustal_num'],
          ['addformats', 'true'],
          ['guidetreeout', 'true'],
          ['sequence', 'ATGC'],
          ['order', 'input'],
          ['iterations', '0'],
        ]);
      });
    });

    describe('serverParametersToFormParameters', () => {
      it('should translate align parameters accurately', () => {
        const serverParams: PublicServerParameters[JobTypes.ALIGN] = {
          sequence:
            '>sp|P06787|CALM_YEAST Calmodulin OS=Saccharomyces cerevisiae (strain ATCC 204508 / S288c) OX=559292 PE=1 SV=1↵MSSNLTEEQIAEFKEAFALFDKDNNGSISSSELATVMRSLGLSPSEAEVNDLMNEIDVDG↵NHQIEFSEFLALMSRQLKSNDSEQELLEAFKVFDKNGDGLISAAELKHVLTSIGEKLTDA↵EVDDMLREVSDGSGEINIQQFAALLSK↵',
          order: 'aligned',
          iterations: 0,
        };

        const formParams = serverParametersToFormParameters(
          JobTypes.ALIGN,
          serverParams
        );

        expect(formParams).toEqual({
          sequence:
            '>sp|P06787|CALM_YEAST Calmodulin OS=Saccharomyces cerevisiae (strain ATCC 204508 / S288c) OX=559292 PE=1 SV=1↵MSSNLTEEQIAEFKEAFALFDKDNNGSISSSELATVMRSLGLSPSEAEVNDLMNEIDVDG↵NHQIEFSEFLALMSRQLKSNDSEQELLEAFKVFDKNGDGLISAAELKHVLTSIGEKLTDA↵EVDDMLREVSDGSGEINIQQFAALLSK↵',
          order: 'aligned',
          iterations: 0,
        });
      });
    });
  });

  describe('BLAST', () => {
    describe('formParametersToServerParameters', () => {
      it('should translate BLAST parameters accurately', () => {
        const formParams: FormParameters[JobTypes.BLAST] = {
          program: 'blastp',
          matrix: 'PAM30',
          hits: 250,
          threshold: '1e-4',
          filter: 'F',
          gapped: false,
          taxIDs: [
            { id: '1234', label: 'some species' },
            { id: '4321', label: 'some other species' },
          ],
          negativeTaxIDs: [],
          stype: 'protein',
          sequence: 'ATGC',
          database: 'uniprotkb',
          hsps: undefined,
        };

        const formData = formParametersToServerParameters(
          JobTypes.BLAST,
          formParams
        );

        expect(Array.from(formData.entries())).toEqual([
          ['email', 'uuw_dev@uniprot.org'],
          ['program', 'blastp'],
          ['matrix', 'PAM30'],
          ['alignments', '250'],
          ['scores', '250'],
          ['exp', '1e-4'],
          ['filter', 'F'],
          ['gapalign', 'false'],
          ['taxids', '1234,4321'],
          ['negative_taxids', ''],
          ['stype', 'protein'],
          ['sequence', 'ATGC'],
          ['database', 'uniprotkb'],
        ]);
      });
    });

    describe('serverParametersToFormParameters', () => {
      it('should translate BLAST parameters accurately', () => {
        const serverParams: PublicServerParameters[JobTypes.BLAST] = {
          align: 0,
          alignments: 250,
          compstats: 'F',
          database: 'uniprotkb_refprotswissprot',
          exp: '1e-1',
          filter: 'T',
          matrix: 'BLOSUM45',
          program: 'blastp',
          taxids: '9606',
          scores: 250,
          sequence:
            '>sp|P06787|CALM_YEAST Calmodulin OS=Saccharomyces cerevisiae (strain ATCC 204508 / S288c) OX=559292 PE=1 SV=1↵MSSNLTEEQIAEFKEAFALFDKDNNGSISSSELATVMRSLGLSPSEAEVNDLMNEIDVDG↵NHQIEFSEFLALMSRQLKSNDSEQELLEAFKVFDKNGDGLISAAELKHVLTSIGEKLTDA↵EVDDMLREVSDGSGEINIQQFAALLSK↵',
          stype: 'protein',
          hsps: undefined,
        };

        const mapping = new Map([['9606', 'Homo Sapiens [9606]']]);

        const formParams = serverParametersToFormParameters(
          JobTypes.BLAST,
          serverParams,
          mapping
        );

        expect(formParams).toEqual({
          database: 'uniprotkb_refprotswissprot',
          filter: 'T',
          gapped: false,
          hits: 250,
          matrix: 'BLOSUM45',
          program: 'blastp',
          sequence:
            '>sp|P06787|CALM_YEAST Calmodulin OS=Saccharomyces cerevisiae (strain ATCC 204508 / S288c) OX=559292 PE=1 SV=1↵MSSNLTEEQIAEFKEAFALFDKDNNGSISSSELATVMRSLGLSPSEAEVNDLMNEIDVDG↵NHQIEFSEFLALMSRQLKSNDSEQELLEAFKVFDKNGDGLISAAELKHVLTSIGEKLTDA↵EVDDMLREVSDGSGEINIQQFAALLSK↵',
          stype: 'protein',
          taxIDs: [{ id: '9606', label: 'Homo Sapiens [9606]' }],
          negativeTaxIDs: [],
          threshold: '1e-1',
        });
      });

      it('should translate blast parameters event without taxon info', () => {
        const serverParams: PublicServerParameters[JobTypes.BLAST] = {
          alignments: 250,
          compstats: 'F',
          database: 'uniprotkb_refprotswissprot',
          exp: '1e-1',
          filter: 'T',
          matrix: 'BLOSUM45',
          program: 'blastp',
          scores: 250,
          sequence:
            '>sp|P06787|CALM_YEAST Calmodulin OS=Saccharomyces cerevisiae (strain ATCC 204508 / S288c) OX=559292 PE=1 SV=1↵MSSNLTEEQIAEFKEAFALFDKDNNGSISSSELATVMRSLGLSPSEAEVNDLMNEIDVDG↵NHQIEFSEFLALMSRQLKSNDSEQELLEAFKVFDKNGDGLISAAELKHVLTSIGEKLTDA↵EVDDMLREVSDGSGEINIQQFAALLSK↵',
          stype: 'protein',
          hsps: undefined,
        };

        const formParams = serverParametersToFormParameters(
          JobTypes.BLAST,
          serverParams
        );

        expect(formParams).toEqual({
          database: 'uniprotkb_refprotswissprot',
          filter: 'T',
          gapped: false,
          hits: 250,
          matrix: 'BLOSUM45',
          program: 'blastp',
          sequence:
            '>sp|P06787|CALM_YEAST Calmodulin OS=Saccharomyces cerevisiae (strain ATCC 204508 / S288c) OX=559292 PE=1 SV=1↵MSSNLTEEQIAEFKEAFALFDKDNNGSISSSELATVMRSLGLSPSEAEVNDLMNEIDVDG↵NHQIEFSEFLALMSRQLKSNDSEQELLEAFKVFDKNGDGLISAAELKHVLTSIGEKLTDA↵EVDDMLREVSDGSGEINIQQFAALLSK↵',
          stype: 'protein',
          taxIDs: [],
          negativeTaxIDs: [],
          threshold: '1e-1',
        });
      });
    });
  });
});
