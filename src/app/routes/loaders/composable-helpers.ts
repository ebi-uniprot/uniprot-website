import { type LoaderFunction, redirect } from 'react-router';
import { type SetReturnType } from 'type-fest';

import { Namespace } from '../../../shared/types/namespaces';

type RedirectFunction = SetReturnType<LoaderFunction, undefined>;

// Typos identified in Google Search Console of websites linking to wrong URL
const weirdTypos = /^ |.html?$|;|&.*$/g;
/**
 * This is meant to clean up any strangely formatted accessions that we've seen
 * links to in the wild */
export const cleanAccession: RedirectFunction = ({ request, params }) => {
  if (params.accession) {
    const cleanedAccession = params.accession.replaceAll(weirdTypos, '');
    // If the accession changed after cleaning, redirect to it
    if (cleanedAccession !== params.accession) {
      throw redirect(
        request.url.replace(params.accession, cleanedAccession),
        308
      );
    }
  }
};

/**
 * This is meant to redirect to the uppercase version of an accession
 */
export const uppercaseAccession: RedirectFunction = ({ request, params }) => {
  if (params.accession) {
    const uppercaseAccession = params.accession.toUpperCase();
    // If the accession changed after cleaning, redirect to it
    if (uppercaseAccession !== params.accession) {
      throw redirect(
        request.url.replace(params.accession, uppercaseAccession),
        308
      );
    }
  }
};

type GetNumberWithPrefixAccession = (
  prefix: string,
  padding: number
) => RedirectFunction;

const reNumber = /^\d+$/;
/**
 * This is meant to create a function to redirect plain numbers to the correct
 * prefixed accession
 */
export const getNumberWithPrefixAccession: GetNumberWithPrefixAccession =
  (prefix, padding) =>
  ({ request, params }) => {
    if (params.accession && reNumber.test(params.accession)) {
      const prefixedAccession = `${prefix}${params.accession.padStart(padding, '0')}`;
      throw redirect(
        request.url.replace(params.accession, prefixedAccession),
        308
      );
    }
  };
/**
 * This is meant to create a function to redirect wrong subPages to the correct
 * subPage or to a default one
 */
type GetSubPages<T extends string = string> = (
  validSubPages: Set<T>,
  defaultSubPage: string,
  redirectSubPages?: Map<string, T>
) => RedirectFunction;

export const getSubPages: GetSubPages =
  (validSubPages, defaultSubPage, redirectSubPages) =>
  ({ request, params }) => {
    if (params.subPage && !validSubPages.has(params.subPage)) {
      if (redirectSubPages) {
        const redirection = redirectSubPages.get(params.subPage);
        if (redirection) {
          throw redirect(request.url.replace(params.subPage, redirection), 308);
        }
      }
      throw redirect(request.url.replace(params.subPage, defaultSubPage), 308);
    }
  };

type RedirectEntry = [pattern: RegExp, replacement: string];
// Regular expression magic incantations 🪄
const catchAllRedirectMap = new Map<RedirectEntry[0], RedirectEntry[1]>([
  // main data
  [
    /^\/(uniprot|entry|comment|alphafold)(?<rest>\/.*)?$/i,
    `/${Namespace.uniprotkb}$<rest>`,
  ],
  [/^\/unipark(?<rest>\/.*)?$/i, `/${Namespace.uniparc}$<rest>`],
  [/^\/proteome(?<rest>\/.*)?$/i, `/${Namespace.proteomes}$<rest>`],
  // supporting data
  [/^\/keyword(?<rest>\/.*)?$/i, `/${Namespace.keywords}$<rest>`],
  [
    /^\/(citation|literatures?|publications?|papers?)(?<rest>\/.*)?$/i,
    `/${Namespace.citations}$<rest>`,
  ],
  [/^\/disease(?<rest>\/.*)?$/i, `/${Namespace.diseases}$<rest>`],
  // exception, this one needs to be singular
  [
    /^\/(((cross|x)[-_ ]?)?reference(d|s)?[-_ ]?)?databases(?<rest>\/.*)?$/i,
    `/${Namespace.database}$<rest>`,
  ],
  [
    /^\/((sub[-_ ]?)?cellular[-_ ]?)?location(?<rest>\/.*)?$/i,
    `/${Namespace.locations}$<rest>`,
  ],
  // tools
  [/^\/(tools-?)?dashboard(?<rest>\/.*)?$/i, `/tool-dashboard$<rest>`],
  [/^\/peptidesearch(?<rest>\/.*)?$/i, `/peptide-search$<rest>`],
  [/^\/upload-?lists?(?<rest>\/.*)?$/i, `/id-mapping$<rest>`],
  // help
  [
    /^\/(manual|faqs?|docs?|biocuration_project|program)(?<rest>\/.*)?$/i,
    `/help$<rest>`,
  ],
  // release notes
  [/^\/(news|release-note)(?<rest>\/.*)?$/i, `/release-notes$<rest>`],
  // other
  [/^\/statistics?$/i, `/uniprotkb/statistics`],
  [/^\/downloads?$/i, `/help/downloads`],
]);
/**
 * This is meant to redirect common link typos to the corresponding page
 */
export const catchAll: RedirectFunction = ({ request }) => {
  const { pathname } = new URL(request.url);
  for (const [pattern, replacement] of catchAllRedirectMap) {
    if (pattern.test(pathname)) {
      throw redirect(pathname.replace(pattern, replacement));
    }
  }
};
