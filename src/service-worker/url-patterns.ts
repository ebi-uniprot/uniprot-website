export const externalAPIs =
  /^https?:\/\/((www|api)\.rhea-db\.org|api\.geneontology\.org|www\.ebi\.ac\.uk\/(interpro\/api|pdbe))\//;

export const sameOriginImagesAndFonts =
  /\.(?:png|gif|jpe?g|webp|svg|ico|woff2?|ttf|eot)$/;

export const externalImages = /^https?:\/\/.*?\.(?:png|gif|jpe?g|webp|svg)$/;

export const googleFontsStylesheets = /^https:\/\/fonts\.googleapis\.com/;

export const googleFontsFiles = /^https:\/\/fonts\.gstatic\.com/;

export const quickGO = /^https:\/\/www\.ebi\.ac\.uk\/QuickGO\/services\//;

export const proteinsAPI = /^https?:\/\/www.ebi\.ac\.uk\/proteins\/api\//;

export const websiteAPI = /^https?:\/\/rest\.uniprot\.org(\/beta)?\//;
