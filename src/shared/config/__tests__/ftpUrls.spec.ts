import { getUniprotkbFtpFilenamesAndUrls, simplifyQuery } from '../ftpUrls';
import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';

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
    ['(*) AND (identity:0.9)', 'identity:0.9'],
    ['(identity:1.0) AND (*) ', 'identity:1.0'],
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
        Namespace.uniprotkb,
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
        Namespace.uniprotkb,
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
  it('should not generate FTP link because there is no corresponding FTP dataset for the query', () => {
    expect(
      getUniprotkbFtpFilenamesAndUrls(
        Namespace.uniprotkb,
        'https://rest.uniprot.org/uniprotkb/stream?compressed=true&download=true&format=fasta&query=(foo)',
        FileFormat.fastaCanonical
      )
    ).toEqual(null);
  });
  it('should not generate FTP link because there is no corresponding FTP dataset for the file format', () => {
    expect(
      getUniprotkbFtpFilenamesAndUrls(
        Namespace.uniprotkb,
        'https://rest.uniprot.org/uniprotkb/stream?compressed=true&download=true&format=fasta&query=(*)',
        FileFormat.excel
      )
    ).toEqual(null);
  });
  it('should not generate FTP link because there is no corresponding FTP dataset for the namespace', () => {
    expect(
      getUniprotkbFtpFilenamesAndUrls(
        Namespace.taxonomy,
        'https://rest.uniprot.org/taxonomy/stream?compressed=true&fields=id%2Ccommon_name%2Cscientific_name%2Clineage%2Clinks&format=tsv&query=%28*%29',
        FileFormat.tsv
      )
    ).toEqual(null);
  });
  it('should generate FTP link to reviewed embeddings', () => {
    expect(
      getUniprotkbFtpFilenamesAndUrls(
        Namespace.uniprotkb,
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
        Namespace.uniprotkb,
        'https://rest.uniprot.org/uniprotkb/stream?compressed=true&download=true&format=h5&query=(*) AND (proteome:UP000005640)',
        FileFormat.embeddings
      )?.[0]?.url
    ).toEqual(
      'https://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/embeddings/UP000005640_9606/per-protein.h5'
    );
  });
  it('should generate FTP link to UniRef file', () => {
    expect(
      getUniprotkbFtpFilenamesAndUrls(
        Namespace.uniref,
        'https://rest.uniprot.org/uniref/stream?compressed=true&download=true&format=fasta&query=(*) AND (identity:0.9)',
        FileFormat.fastaRepresentative
      )?.[0]?.url
    ).toEqual(
      'https://ftp.uniprot.org/pub/databases/uniprot/uniref/uniref90/uniref90.fasta.gz'
    );
  });
  it('should generate FTP link to UniParc directory', () => {
    expect(
      getUniprotkbFtpFilenamesAndUrls(
        Namespace.uniparc,
        'https://rest.uniprot.org/uniparc/stream?compressed=true&format=fasta&query=(*)',
        FileFormat.fasta
      )?.[0]?.url
    ).toEqual(
      'https://ftp.uniprot.org/pub/databases/uniprot/uniparc/fasta/active/'
    );
  });
});
