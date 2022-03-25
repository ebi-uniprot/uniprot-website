import { UniRefLiteAPIModel } from '../../../../../uniref/adapters/uniRefConverter';

const mock: { results: UniRefLiteAPIModel[] } = {
  results: [
    {
      id: 'UniRef50_P05067',
      name: 'Cluster: Amyloid-beta precursor protein',
      updated: '2022-01-19',
      entryType: 'UniRef50',
      commonTaxon: {
        scientificName: 'cellular organisms',
        taxonId: 131567,
      },
      memberCount: 2173,
      organismCount: 672,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        memberId: 'A4_HUMAN',
        organismName: 'Homo sapiens (Human)',
        organismTaxId: 9606,
        sequenceLength: 770,
        proteinName: 'Amyloid-beta precursor protein',
        accessions: [
          'P05067',
          'B2R5V1',
          'B4DII8',
          'D3DSD1',
          'D3DSD2',
          'D3DSD3',
          'P09000',
          'P78438',
          'Q13764',
          'Q13778',
          'Q13793',
          'Q16011',
          'Q16014',
          'Q16019',
          'Q16020',
          'Q6GSC0',
          'Q8WZ99',
          'Q9BT38',
          'Q9UC33',
          'Q9UCA9',
          'Q9UCB6',
          'Q9UCC8',
          'Q9UCD1',
          'Q9UQ58',
        ],
        uniref90Id: 'UniRef90_P05067',
        uniref100Id: 'UniRef100_P05067',
        uniparcId: 'UPI000002DB1C',
        sequence: {
          value:
            'MLPGLALLLLAAWTARALEVPTDGNAGLLAEPQIAMFCGRLNMHMNVQNGKWDSDPSGTKTCIDTKEGILQYCQEVYPELQITNVVEANQPVTIQNWCKRGRKQCKTHPHFVIPYRCLVGEFVSDALLVPDKCKFLHQERMDVCETHLHWHTVAKETCSEKSTNLHDYGMLLPCGIDKFRGVEFVCCPLAEESDNVDSADAEEDDSDVWWGGADTDYADGSEDKVVEVAEEEEVAEVEEEEADDDEDDEDGDEVEEEAEEPYEEATERTTSIATTTTTTTESVEEVVREVCSEQAETGPCRAMISRWYFDVTEGKCAPFFYGGCGGNRNNFDTEEYCMAVCGSAMSQSLLKTTQEPLARDPVKLPTTAASTPDAVDKYLETPGDENEHAHFQKAKERLEAKHRERMSQVMREWEEAERQAKNLPKADKKAVIQHFQEKVESLEQEAANERQQLVETHMARVEAMLNDRRRLALENYITALQAVPPRPRHVFNMLKKYVRAEQKDRQHTLKHFEHVRMVDPKKAAQIRSQVMTHLRVIYERMNQSLSLLYNVPAVAEEIQDEVDELLQKEQNYSDDVLANMISEPRISYGNDALMPSLTETKTTVELLPVNGEFSLDDLQPWHSFGADSVPANTENEVEPVDARPAADRGLTTRPGSGLTNIKTEEISEVKMDAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVVIATVIVITLVMLKKKQYTSIHHGVVEVDAAVTPEERHLSKMQQNGYENPTYKFFEQMQN',
          length: 770,
          molWeight: 86943,
          crc64: 'A12EE761403740F5',
          md5: '7DD43312CD29A262ACDC0517230BC5CA',
        },
      },
      seedId: 'UPI001386A8D7',
      memberIdTypes: [
        'UniProtKB Reviewed (Swiss-Prot)',
        'UniParc',
        'UniProtKB Unreviewed (TrEMBL)',
      ],
      members: [
        'P05067',
        'P12023',
        'Q5IS80',
        'P53601',
        'P29216',
        'P08592',
        'Q60495',
        'P79307',
        'Q28053',
        'Q28280',
      ],
      organisms: [
        {
          scientificName: 'Homo sapiens',
          commonName: 'Human',
          taxonId: 9606,
        },
        {
          scientificName: 'Mus musculus',
          commonName: 'Mouse',
          taxonId: 10090,
        },
        {
          scientificName: 'Pan troglodytes',
          commonName: 'Chimpanzee',
          taxonId: 9598,
        },
        {
          scientificName: 'Macaca fascicularis',
          commonName: 'Crab-eating macaque',
          taxonId: 9541,
        },
        {
          scientificName: 'Macaca mulatta',
          commonName: 'Rhesus macaque',
          taxonId: 9544,
        },
        {
          scientificName: 'Rattus norvegicus',
          commonName: 'Rat',
          taxonId: 10116,
        },
        {
          scientificName: 'Cavia porcellus',
          commonName: 'Guinea pig',
          taxonId: 10141,
        },
        {
          scientificName: 'Sus scrofa',
          commonName: 'Pig',
          taxonId: 9823,
        },
        {
          scientificName: 'Bos taurus',
          commonName: 'Bovine',
          taxonId: 9913,
        },
        {
          scientificName: 'Canis lupus familiaris',
          commonName: 'Dog',
          taxonId: 9615,
        },
      ],
    },
    {
      id: 'UniRef100_P05067',
      name: 'Cluster: Amyloid-beta precursor protein',
      updated: '2021-04-07',
      entryType: 'UniRef100',
      commonTaxon: {
        scientificName: 'Catarrhini',
        taxonId: 9526,
      },
      memberCount: 4,
      organismCount: 2,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        memberId: 'A4_HUMAN',
        organismName: 'Homo sapiens (Human)',
        organismTaxId: 9606,
        sequenceLength: 770,
        proteinName: 'Amyloid-beta precursor protein',
        accessions: [
          'P05067',
          'B2R5V1',
          'B4DII8',
          'D3DSD1',
          'D3DSD2',
          'D3DSD3',
          'P09000',
          'P78438',
          'Q13764',
          'Q13778',
          'Q13793',
          'Q16011',
          'Q16014',
          'Q16019',
          'Q16020',
          'Q6GSC0',
          'Q8WZ99',
          'Q9BT38',
          'Q9UC33',
          'Q9UCA9',
          'Q9UCB6',
          'Q9UCC8',
          'Q9UCD1',
          'Q9UQ58',
        ],
        uniref50Id: 'UniRef50_P05067',
        uniref90Id: 'UniRef90_P05067',
        uniparcId: 'UPI000002DB1C',
        seed: true,
        sequence: {
          value:
            'MLPGLALLLLAAWTARALEVPTDGNAGLLAEPQIAMFCGRLNMHMNVQNGKWDSDPSGTKTCIDTKEGILQYCQEVYPELQITNVVEANQPVTIQNWCKRGRKQCKTHPHFVIPYRCLVGEFVSDALLVPDKCKFLHQERMDVCETHLHWHTVAKETCSEKSTNLHDYGMLLPCGIDKFRGVEFVCCPLAEESDNVDSADAEEDDSDVWWGGADTDYADGSEDKVVEVAEEEEVAEVEEEEADDDEDDEDGDEVEEEAEEPYEEATERTTSIATTTTTTTESVEEVVREVCSEQAETGPCRAMISRWYFDVTEGKCAPFFYGGCGGNRNNFDTEEYCMAVCGSAMSQSLLKTTQEPLARDPVKLPTTAASTPDAVDKYLETPGDENEHAHFQKAKERLEAKHRERMSQVMREWEEAERQAKNLPKADKKAVIQHFQEKVESLEQEAANERQQLVETHMARVEAMLNDRRRLALENYITALQAVPPRPRHVFNMLKKYVRAEQKDRQHTLKHFEHVRMVDPKKAAQIRSQVMTHLRVIYERMNQSLSLLYNVPAVAEEIQDEVDELLQKEQNYSDDVLANMISEPRISYGNDALMPSLTETKTTVELLPVNGEFSLDDLQPWHSFGADSVPANTENEVEPVDARPAADRGLTTRPGSGLTNIKTEEISEVKMDAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVVIATVIVITLVMLKKKQYTSIHHGVVEVDAAVTPEERHLSKMQQNGYENPTYKFFEQMQN',
          length: 770,
          molWeight: 86943,
          crc64: 'A12EE761403740F5',
          md5: '7DD43312CD29A262ACDC0517230BC5CA',
        },
      },
      seedId: 'P05067',
      memberIdTypes: [
        'UniProtKB Reviewed (Swiss-Prot)',
        'UniParc',
        'UniProtKB Unreviewed (TrEMBL)',
      ],
      members: ['P05067', 'A0A140VJC8', 'O97584', 'UPI0000110448'],
      organisms: [
        {
          scientificName: 'Homo sapiens',
          commonName: 'Human',
          taxonId: 9606,
        },
        {
          scientificName: 'Macaca mulatta',
          commonName: 'Rhesus macaque',
          taxonId: 9544,
        },
      ],
    },
    {
      id: 'UniRef90_P05067',
      name: 'Cluster: Amyloid-beta precursor protein',
      updated: '2022-01-19',
      entryType: 'UniRef90',
      commonTaxon: {
        scientificName: 'cellular organisms',
        taxonId: 131567,
      },
      memberCount: 531,
      organismCount: 394,
      representativeMember: {
        memberIdType: 'UniProtKB ID',
        memberId: 'A4_HUMAN',
        organismName: 'Homo sapiens (Human)',
        organismTaxId: 9606,
        sequenceLength: 770,
        proteinName: 'Amyloid-beta precursor protein',
        accessions: [
          'P05067',
          'B2R5V1',
          'B4DII8',
          'D3DSD1',
          'D3DSD2',
          'D3DSD3',
          'P09000',
          'P78438',
          'Q13764',
          'Q13778',
          'Q13793',
          'Q16011',
          'Q16014',
          'Q16019',
          'Q16020',
          'Q6GSC0',
          'Q8WZ99',
          'Q9BT38',
          'Q9UC33',
          'Q9UCA9',
          'Q9UCB6',
          'Q9UCC8',
          'Q9UCD1',
          'Q9UQ58',
        ],
        uniref50Id: 'UniRef50_P05067',
        uniref100Id: 'UniRef100_P05067',
        uniparcId: 'UPI000002DB1C',
        sequence: {
          value:
            'MLPGLALLLLAAWTARALEVPTDGNAGLLAEPQIAMFCGRLNMHMNVQNGKWDSDPSGTKTCIDTKEGILQYCQEVYPELQITNVVEANQPVTIQNWCKRGRKQCKTHPHFVIPYRCLVGEFVSDALLVPDKCKFLHQERMDVCETHLHWHTVAKETCSEKSTNLHDYGMLLPCGIDKFRGVEFVCCPLAEESDNVDSADAEEDDSDVWWGGADTDYADGSEDKVVEVAEEEEVAEVEEEEADDDEDDEDGDEVEEEAEEPYEEATERTTSIATTTTTTTESVEEVVREVCSEQAETGPCRAMISRWYFDVTEGKCAPFFYGGCGGNRNNFDTEEYCMAVCGSAMSQSLLKTTQEPLARDPVKLPTTAASTPDAVDKYLETPGDENEHAHFQKAKERLEAKHRERMSQVMREWEEAERQAKNLPKADKKAVIQHFQEKVESLEQEAANERQQLVETHMARVEAMLNDRRRLALENYITALQAVPPRPRHVFNMLKKYVRAEQKDRQHTLKHFEHVRMVDPKKAAQIRSQVMTHLRVIYERMNQSLSLLYNVPAVAEEIQDEVDELLQKEQNYSDDVLANMISEPRISYGNDALMPSLTETKTTVELLPVNGEFSLDDLQPWHSFGADSVPANTENEVEPVDARPAADRGLTTRPGSGLTNIKTEEISEVKMDAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVVIATVIVITLVMLKKKQYTSIHHGVVEVDAAVTPEERHLSKMQQNGYENPTYKFFEQMQN',
          length: 770,
          molWeight: 86943,
          crc64: 'A12EE761403740F5',
          md5: '7DD43312CD29A262ACDC0517230BC5CA',
        },
      },
      seedId: 'UPI001386A8D7',
      memberIdTypes: [
        'UniProtKB Reviewed (Swiss-Prot)',
        'UniParc',
        'UniProtKB Unreviewed (TrEMBL)',
      ],
      members: [
        'P05067',
        'Q60495',
        'P12023',
        'P79307',
        'P08592',
        'P53601',
        'P29216',
        'Q5IS80',
        'Q28053',
        'Q28280',
      ],
      organisms: [
        {
          scientificName: 'Homo sapiens',
          commonName: 'Human',
          taxonId: 9606,
        },
        {
          scientificName: 'Cavia porcellus',
          commonName: 'Guinea pig',
          taxonId: 10141,
        },
        {
          scientificName: 'Mus musculus',
          commonName: 'Mouse',
          taxonId: 10090,
        },
        {
          scientificName: 'Sus scrofa',
          commonName: 'Pig',
          taxonId: 9823,
        },
        {
          scientificName: 'Rattus norvegicus',
          commonName: 'Rat',
          taxonId: 10116,
        },
        {
          scientificName: 'Macaca fascicularis',
          commonName: 'Crab-eating macaque',
          taxonId: 9541,
        },
        {
          scientificName: 'Macaca mulatta',
          commonName: 'Rhesus macaque',
          taxonId: 9544,
        },
        {
          scientificName: 'Pan troglodytes',
          commonName: 'Chimpanzee',
          taxonId: 9598,
        },
        {
          scientificName: 'Bos taurus',
          commonName: 'Bovine',
          taxonId: 9913,
        },
        {
          scientificName: 'Canis lupus familiaris',
          commonName: 'Dog',
          taxonId: 9615,
        },
      ],
    },
  ],
  suggestions: [
    {
      query: '( uniprot_id:p25037 )',
      hits: 1,
    },
    {
      query: '( uniprot_id:p05085 )',
      hits: 1,
    },
    {
      query: '( uniprot_id:p55567 )',
      hits: 1,
    },
  ],
};
export default mock;
