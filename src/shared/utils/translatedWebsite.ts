/**
 * Tries to detect if the website has been translated by a tool, if so tries to
 * return the language that it has been translated into
 */
export const translatedWebsite = (): string | false => {
  // Google Chrome and Firefox modify the html[lang] attribute
  const { lang } = document.documentElement;
  if (lang && lang !== 'en') {
    return lang;
  }

  // Immersive Translate add-on
  const imtState = document.documentElement.getAttribute('imt-state');
  if (imtState && imtState !== 'original') {
    // Not exposing into which language, but has definitely been translated
    return 'unknown';
  }

  return false;
};
