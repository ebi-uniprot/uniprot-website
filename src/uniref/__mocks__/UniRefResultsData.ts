import { FacetObject } from '../../uniprotkb/types/responseTypes';
import { UniRefLiteAPIModel } from '../adapters/uniRefConverter';

type Payload = {
  facets: FacetObject[];
  results: Partial<UniRefLiteAPIModel>[];
};

// api/uniref/search?facets=identity&query=glucose&size=1
const mock: Payload = {
  facets: [
    {
      label: 'Clusters',
      name: 'identity',
      allowMultipleSelection: true,
      values: [
        { label: '100%', value: '1.0', count: 728513 },
        { label: '90%', value: '0.9', count: 288809 },
        { label: '50%', value: '0.5', count: 37152 },
      ],
    },
  ],
  results: [
    {
      id: 'UniRef100_A0A0B7GQ86',
      name:
        'Cluster: PTS system glucose-specific EIICBA component [includes: glucose permease IIC component glucose-specific phosphotransferase enzyme IIB component glucose-specific phosphotransferase enzyme IIA compon...',
      updated: '2021-02-10',
      entryType: 'UniRef100',
      commonTaxon: { scientificName: 'Streptococcus sanguinis', taxonId: 1305 },
      memberCount: 1,
      organismCount: 1,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        memberId: 'A0A0B7GQ86_STRSA',
        organismName: 'Streptococcus sanguinis',
        organismTaxId: 1305,
        sequenceLength: 730,
        proteinName:
          'PTS system glucose-specific EIICBA component [includes: glucose permease IIC component glucose-specific phosphotransferase enzyme IIB component glucose-specific phosphotransferase enzyme IIA compon...',
        accessions: ['A0A0B7GQ86'],
        uniref50Id: 'UniRef50_P35595',
        uniref90Id: 'UniRef90_A0A0B7GQ86',
        uniparcId: { value: 'UPI000588D8C8' },
        seed: true,
        sequence: {
          value:
            'MMKDSFKNIFSFEFWQKFGKALMVVVAVMPAAGLMISIGKSIPMINPNLGVLVTTGGVLEQIGWGVIGNLHILFALAIGGSWAKERAGGAFAAGLSFILINRITGVMFGVTGDMLADKTAVVKTMFGASIKVSDYFISVLESPALNMGVFVGIIAGFVGATAYNKYYNFRKLPDALSFFNGKRFVPFVVILRSAIVAIVLSFVWPVVQSGINSFGIWIANSQDTAPILAPFIYGTLERLLLPFGLHHMLTIPMNYTELGGVYEVITGSGAGTTVAGQDPLWLAWVTDLVGTKTADPNTYKHLLETVHPARFKVGQMIGSFGILMGVAAAIYHNVDADKKHKYKGMMIATALATFLTGVTEPIEYMFMFVATPLYLVYSLVQGAAFAMADIVALRVHSFGSIEFLTRTPMAINAGLGGDIINFIWVTILFGVVMYFISNFMIKKFNYATPGRNGNYETAEGSDEASSSDSTGGKVAAASQAVNVINLLGGRANIVDVDACMTRLRVTVKDAEKVGTEEQWKAEGAMGLVMKGQGVQAIYGPKADVLKSDIQDLLDSGEVIPETLPSQKAESEAAEVSYKGVTEEVETVADGQVIDLADVKDPVFSQKMMGDGFAVEPENGKIYSPVAGTVTSVFPSKHAIGLVTDNGLEVLVHIGLETVSLEGKPFEVHVSEGQKVAAGDLLVTADLEAIKEAGRETSTIVVFTNAAAIKSVTVEKLGQASAKTVVAKVEL',
          length: 730,
          molWeight: 77899,
          crc64: 'AF209122B81434C9',
          md5: '1DFB054E2548BEEB3553424EA107BFE7',
        },
      },
      seedId: 'A0A0B7GQ86',
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)'],
      members: ['A0A0B7GQ86'],
      organisms: [{ scientificName: 'Streptococcus sanguinis', taxonId: 1305 }],
    },
  ],
};

export default mock;
