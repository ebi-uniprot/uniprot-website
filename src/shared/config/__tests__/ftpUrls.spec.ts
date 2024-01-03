import { getUniprotkbFtpFilenamesAndUrls, simplifyQuery } from '../ftpUrls';
import { FileFormat } from '../../types/resultsDownload';

describe('simplifyQuery', () => {
  const testCases: [string, string | null][] = [
    ['(((reviewed:false) and (*)))', 'reviewed:false'],
    ['((reviewed:false) and (*))', 'reviewed:false'],
    ['((reviewed:false) and *)', 'reviewed:false'],
    ['(reviewed:false)   and  *', 'reviewed:false'],
    ['(reviewed:false)', 'reviewed:false'],
    ['reviewed:false', 'reviewed:false'],
    ['(((reviewed:true) and (*)))', 'reviewed:true'],
    ['((reviewed:true) and (*))', 'reviewed:true'],
    ['((reviewed:true) and *)', 'reviewed:true'],
    ['(reviewed:true) and *', 'reviewed:true'],
    ['(reviewed:true)', 'reviewed:true'],
    ['reviewed:true', 'reviewed:true'],
    ['(((*) and (reviewed:false)))', 'reviewed:false'],
    ['((*) and (reviewed:false))', 'reviewed:false'],
    ['(* and (reviewed:false))', 'reviewed:false'],
    ['* and (reviewed:false)', 'reviewed:false'],
    ['(((*) and (reviewed:true)))', 'reviewed:true'],
    ['((*) and (reviewed:true))', 'reviewed:true'],
    ['(* and (reviewed:true))', 'reviewed:true'],
    ['* and (reviewed:true)', 'reviewed:true'],
    ['* and (proteome:UP1)', 'proteome:up1'],
    ['((reviewed:true) and *) and other stuff', null],
    ['other stuff and ((reviewed:true) and *)', null],
    ['and * other stuff and reviewed:false', null],
    ['foo:bar', null],
    ['*', '*'],
    ['(*)', '*'],
    ['((*))', '*'],
  ];
  test.each(testCases)(
    'should simplify query %p → %p',
    (query, simplifiedQuery) => {
      expect(simplifyQuery(query)).toEqual(simplifiedQuery);
    }
  );
});

describe('getUniprotkbFtpUrl', () => {
  it('should generate FTP link', () => {
    expect(
      getUniprotkbFtpFilenamesAndUrls(
        'https://rest.uniprot.org/uniprotkb/stream?compressed=true&download=true&format=xml&query=(*) AND (reviewed:true)',
        FileFormat.xml
      )?.[0]?.url
    ).toEqual(
      'https://ftp.uniprot.org/pub/databases/uniprot/knowledgebase/complete/uniprot_sprot.xml.gz'
    );
  });
  it('should generate FTP link to *', () => {
    expect(
      getUniprotkbFtpFilenamesAndUrls(
        'https://rest.uniprot.org/uniprotkb/stream?compressed=true&download=true&format=xml&query=(*)',
        FileFormat.xml
      )
    ).toEqual([
      {
        filename: 'uniprot_sprot.xml.gz',
        url: 'https://ftp.uniprot.org/pub/databases/uniprot/knowledgebase/complete/uniprot_sprot.xml.gz',
      },
      {
        filename: 'uniprot_trembl.xml.gz',
        url: 'https://ftp.uniprot.org/pub/databases/uniprot/knowledgebase/complete/uniprot_trembl.xml.gz',
      },
    ]);
  });
  it('should not generate FTP link', () => {
    expect(
      getUniprotkbFtpFilenamesAndUrls(
        'https://rest.uniprot.org/uniprotkb/stream?compressed=true&download=true&format=fasta&query=(*)',
        FileFormat.fastaCanonical
      )
    ).toEqual(null);
  });
  it('should generate FTP link to reviewed embeddings', () => {
    expect(
      getUniprotkbFtpFilenamesAndUrls(
        'https://rest.uniprot.org/uniprotkb/stream?compressed=true&download=true&format=h5&query=(*) AND (reviewed:true)',
        FileFormat.embeddings
      )?.[0]?.url
    ).toEqual(
      'https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/embeddings/uniprot_sprot/per-protein.h5'
    );
  });
  it('should generate FTP link to human proteome embeddings', () => {
    expect(
      getUniprotkbFtpFilenamesAndUrls(
        'https://rest.uniprot.org/uniprotkb/stream?compressed=true&download=true&format=h5&query=(*) AND (proteome:UP000005640)',
        FileFormat.embeddings
      )?.[0]?.url
    ).toEqual(
      'https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/embeddings/UP000005640_9606/per-protein.h5'
    );
  });
});
