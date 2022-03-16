#!/usr/bin/env node
/* eslint-disable no-console, @typescript-eslint/no-var-requires */
const fs = require('fs');
const axios = require('axios');
const ProgressBar = require('progress');

const accessionCountPerFile = 50_000;
const publicPath = 'https://www.uniprot.org/';
// const query = '*';
const query = '(organism_id:9606) OR (reviewed:true)';

const nextRE = /<([0-9a-zA-Z$\-_.+!*'(),?/:=&%]+)>; rel="next"/;

const getNextURLFromHeaders = (parsedHeaders) => {
  if (!parsedHeaders?.link) {
    return;
  }

  const match = nextRE.exec(parsedHeaders.link);
  // eslint-disable-next-line consistent-return
  return match?.[1];
};

async function* entryGenerator() {
  let response = await axios({
    url: `https://rest.uniprot.org/beta/uniprotkb/search?query=${query}&fields=accession,date_modified&size=500`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  // first, yield the total
  yield +response.headers['x-total-records'];

  for (const result of response.data.results) {
    // then yield each entry from the first page
    yield {
      accession: result.primaryAccession,
      lastModified: result.entryAudit.lastAnnotationUpdateDate,
    };
  }

  let next = getNextURLFromHeaders(response.headers);

  while (next) {
    // eslint-disable-next-line no-await-in-loop
    response = await axios({
      url: next,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    for (const result of response.data.results) {
      if (result) {
        // then yield each entry for the next pages
        yield {
          accession: result.primaryAccession,
          lastModified: result.entryAudit.lastAnnotationUpdateDate,
        };
      }
    }

    next = getNextURLFromHeaders(response.headers);
  }
}

async function* fileGenerator() {
  const entryIterator = entryGenerator();

  const { value: total } = await entryIterator.next();

  const padLength = `${Math.ceil(total / accessionCountPerFile)}`.length;
  let fileIndex = 0;
  let accessionCountInFile = 0;

  console.log(`found ${total} entries for the query "${query}"`);
  const bar = new ProgressBar(
    '🗺  generating sitemaps [:bar] :rate URLs per second :percent :etas',
    {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total,
    }
  );

  let { value: entry } = await entryIterator.next();

  while (entry) {
    // eslint-disable-next-line no-plusplus
    const filename = `sitemap-${`${++fileIndex}`.padStart(padLength, '0')}.xml`;
    const writableStream = fs.createWriteStream(`./${filename}`);

    // Note: might want to pipe it through a gzip stream
    writableStream.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`);

    writableStream.on('error', (error) => {
      console.log(
        `An error occured while writing to the index file. Error: ${error.message}`
      );
    });

    while (accessionCountInFile < accessionCountPerFile && entry) {
      writableStream.write(`  <url>
    <loc>https://www.uniprot.org/uniprotkb/${entry.accession}</loc>
    <lastmod>${entry.lastModified}</lastmod>
  </url>
`);
      bar.tick(1);
      // eslint-disable-next-line no-plusplus
      accessionCountInFile++;
      // eslint-disable-next-line no-await-in-loop
      entry = (await entryIterator.next()).value;
    }

    writableStream.end('</urlset>');
    accessionCountInFile = 0;
    yield filename;
  }
}

const main = async () => {
  // Note: might want to pipe it through a gzip stream
  const writableStream = fs.createWriteStream('./sitemap-index.xml');
  writableStream.on('error', (error) => {
    console.log(
      `An error occured while writing to the index file. Error: ${error.message}`
    );
  });
  writableStream.write(`<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`);
  for await (const filename of fileGenerator()) {
    writableStream.write(`  <sitemap>
    <loc>${publicPath}${filename}</loc>
  </sitemap>
`);
  }
  writableStream.end('</sitemapindex>');
};

main();
