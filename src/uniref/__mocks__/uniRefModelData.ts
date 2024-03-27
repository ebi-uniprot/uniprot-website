import { UniRefAPIModel } from '../adapters/uniRefConverter';

// Source: /uniref/UniRef100_A0A0B7GQ86
// Retrieved: 2024-03-25
const mock: UniRefAPIModel = {
  id: 'UniRef100_A0A0B7GQ86',
  name: 'Cluster: PTS system glucose-specific EIICBA component [includes: glucose permease IIC component glucose-specific phosphotransferase enzyme IIB component glucose-specific phosphotransferase enzyme IIA compon...',
  memberCount: 1,
  updated: '2021-02-10',
  entryType: 'UniRef100',
  commonTaxon: {
    scientificName: 'Streptococcus sanguinis',
    taxonId: 1305,
  },
  seedId: 'A0A0B7GQ86',
  representativeMember: {
    memberIdType: 'UniProtKB ID',
    memberId: 'A0A0B7GQ86_STRSA',
    organismName: 'Streptococcus sanguinis',
    organismTaxId: 1305,
    sequenceLength: 730,
    proteinName:
      'PTS system glucose-specific EIICBA component [includes: glucose permease IIC component glucose-specific phosphotransferase enzyme IIB component glucose-specific phosphotransferase enzyme IIA compon...',
    accessions: ['A0A0B7GQ86'],
    uniref50Id: 'UniRef50_A0A0B7GQ86',
    uniref90Id: 'UniRef90_A0A0B7GQ86',
    uniparcId: 'UPI000588D8C8',
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
};

export default mock;
