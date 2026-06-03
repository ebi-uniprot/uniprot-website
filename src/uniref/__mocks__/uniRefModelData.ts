import { type UniRefAPIModel } from '../adapters/uniRefConverter';

// Source: uniref/UniRef100_A0A000
// Retrieved: 2026-06-03
const mock: UniRefAPIModel = {
  id: 'UniRef100_A0A000',
  name: 'Cluster: 8-amino-7-oxononanoate synthase',
  memberCount: 1,
  updated: '2026-06-10',
  entryType: 'UniRef100',
  commonTaxon: {
    scientificName: 'Streptomyces viridosporus',
    taxonId: 67581,
  },
  seedId: 'A0A000',
  representativeMember: {
    memberIdType: 'UniProtKB ID',
    memberId: 'A0A000_STRVD',
    organismName: 'Streptomyces viridosporus',
    organismTaxId: 67581,
    sequenceLength: 394,
    proteinName: '8-amino-7-oxononanoate synthase',
    accessions: ['A0A000'],
    uniref50Id: 'UniRef50_A0A371PVM1',
    uniref90Id: 'UniRef90_A0ABX6AL62',
    uniparcId: 'UPI0000E5B23C',
    seed: true,
    sequence: {
      value:
        'MDFFVRLARETGDRKREFLELGRKAGRFPAASTSNGEISIWCSNDYLGMGQHPDVLDAMKRSVDEYGGGSGGSRNTGGTNHFHVALEREPAEPHGKEDAVLFTSGYSANEGSLSVLAGAVDDCQVFSDSANHASIIDGLRHSGARKHVFRHKDGRHLEELLAAADRDKPKFIALESVHSMRGDIALLAEIAGLAKRYGAVTFLDEVHAVGMYGPGGAGIAARDGVHCEFTVVMGTLAKAFGMTGGYVAGPAVLMDAVRARARSFVFTTALPPAVAAGALAAVRHLRGSDEERRRPAENARLTHGLLRERDIPVLSDRSPIVPVLVGEDRMCKRMSALPLERHGAYVQAIDAPSVPAGEEILRIAPSAVHETEEIHRFVDALDGIWSELGAARRV',
      length: 394,
      molWeight: 42315,
      crc64: 'F1DD0C1042811B48',
      md5: 'E8872C7A0261B9E88E6FF47EB34E4162',
    },
  },
};

export default mock;
