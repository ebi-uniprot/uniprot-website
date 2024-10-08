import { FacetObject } from '../../shared/types/results';
import { UniRefLiteAPIModel } from '../adapters/uniRefConverter';

type Payload = {
  facets: FacetObject[];
  results: Partial<UniRefLiteAPIModel>[];
};

// Source: uniref/search?facets=identity&query=glucose&size=1
// Retrieved: 2024-10-01
const mock: Payload = {
  facets: [
    {
      label: 'Clusters',
      name: 'identity',
      allowMultipleSelection: true,
      values: [
        {
          label: '100%',
          value: '1.0',
          count: 1214754,
        },
        {
          label: '90%',
          value: '0.9',
          count: 458434,
        },
        {
          label: '50%',
          value: '0.5',
          count: 68574,
        },
      ],
    },
  ],
  results: [
    {
      id: 'UniRef50_A0A3E1E969',
      name: 'Cluster: Glucose dehydrogenase/Glucose dehydrogenase/Glucose dehydrogenase',
      updated: '2024-10-02',
      entryType: 'UniRef50',
      commonTaxon: {
        scientificName: 'Bacteria',
        taxonId: 2,
      },
      memberCount: 6,
      organismCount: 6,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        memberId: 'A0A3E1E969_UNCVE',
        organismName: 'Verrucomicrobiota bacterium',
        organismTaxId: 2026799,
        sequenceLength: 1227,
        proteinName:
          'Glucose dehydrogenase/Glucose dehydrogenase/Glucose dehydrogenase',
        accessions: ['A0A3E1E969'],
        uniref90Id: 'UniRef90_A0A3E1E969',
        uniref100Id: 'UniRef100_A0A3E1E969',
        uniparcId: 'UPI000E38EA28',
        seed: true,
        sequence: {
          value:
            'MKTTFLLNHTLSALAAFALSALAPPVQAATPPSQPASAAPAQKSPELFRSSNLAAWCIVPFDKGKRNPEQRAEMLEKLGFSKFVYDYRKEHILEWDAEMEALKRHHVDLTGWWFPGSLNPEALTALELFRKHHFKPQLWVSGGGGSLKADSAEEQARRVANEVRRLKPIAEAARADGLTVGLYNHGSWFGEPDNQIEILNALKAEGFSNVGLVYNQHHGHGHIEGFKELLERMKPHLIFLNLNGMDIRGDQVGRKILPLGIGTEDLSLLKIIAKSGYTGPIGILNHTGEDAEARLQDNLEGLRWLTPQLQGDPAGPKPVPRSFNATPAPAGAKAAPSSASATSVPSLSPAFGNALHGSLALEGKDSYRTPPLSVECRAKLNSATSFNILVASDTKASADHWELYTYSKSGFLSLYMPGRGGEIRSEINVCDGTWHALAATIGPEKVRLYVDGKLVKEAPLRPRVGTPIPGGLALGALVEGRPSCDGLLDNVRISSGEREISAPGDAPLKTDATTLGLWDFEALPATPAQAAAIAPIPELDRSQLASSFILPAAKPERLTPANGWPSDTSSGNWERSLGGPTSNRFSNLKQITRENVAQLEPAWTYRSGDGNANIQCNPIVVHGTMFTPTPGKNIVAVDAATGKERWRFAPKTLIGGESSNPARRGLLYWKGDAIAPPRLLFGDGNWLIALHPDTGLPVEGFGTGGKTQVPTGTTAVGALHGHIFVLPGYGGDVYGFDARDGKLLWTFKTRPPAGEFGNETWSKLESGANCWGGMAMDESRGIAFISLGSPKPNFIGINHQGDNLFSNCVLALDATNGKRLWHFQELRHDIWDWDIPAPPNLVTVERHGRRVDALAQVTKLGNTLLLDRVTGEPLYDFRFVRVDTHGLPGDSTAVYQPAPELPQPFARQAYTRADMPSNPEARAALLPLLDRANLGPFPSFDEARPTLLFNIHGGAEWTGAAADPKGFLYVTSNEIPWSITCFRDDDPAPLLPPSAGEQIYQTNCSACHGPDRKGLGHAPPMRGLRHRLAEPDVRAILKTGRASMPPMPHLTEEQLQPLLDFVLCRDRPSAPQGASKGKEWTFSGFNRLLDSNGYPACSTPWGTLNCINLNTGETAWSVPLGEYPELKEKGVPKTGQENFGGAIVTSSGLVFVSGTRDKKIRAFDASTGAELWSQSLPLHGTAPPSSYEAEGRQFILQPATGGGKLGGPAGDTWVAFALPKGRLADSR',
          length: 1227,
          molWeight: 132326,
          crc64: '5BD17156D82A1662',
          md5: '64A3B23507FDB3D06385EC05AFF2736C',
        },
      },
      seedId: 'A0A3E1E969',
      memberIdTypes: ['UniProtKB Unreviewed (TrEMBL)', 'UniParc'],
      members: [
        'A0A3E1E969',
        'A0A7Y5C7M4',
        'B4CTX8',
        'A0A3C1H8I3',
        'UPI0032A75626',
        'UPI00104BEFB8',
      ],
      organisms: [
        {
          scientificName: 'Verrucomicrobiota bacterium',
          taxonId: 2026799,
        },
        {
          scientificName: 'Hydrogenedentota bacterium',
          taxonId: 2030809,
        },
        {
          scientificName: 'Chthoniobacter flavus Ellin428',
          taxonId: 497964,
        },
        {
          scientificName: 'Verrucomicrobiales bacterium',
          taxonId: 2026801,
        },
        {
          scientificName: 'Chthoniobacter sp.',
          taxonId: 2510640,
        },
        {
          scientificName: 'Chthoniobacter flavus',
          taxonId: 191863,
        },
      ],
      goTerms: [
        {
          goId: 'GO:0020037',
          aspect: 'GO Molecular Function',
        },
        {
          goId: 'GO:0046872',
          aspect: 'GO Molecular Function',
        },
        {
          goId: 'GO:0008876',
          aspect: 'GO Molecular Function',
        },
        {
          goId: 'GO:0009055',
          aspect: 'GO Molecular Function',
        },
      ],
    },
  ],
};

export default mock;
