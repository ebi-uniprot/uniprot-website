export type NightingaleViewRange = {
  'display-start': number;
  'display-end': number;
};

export const withinRange = (
  featureStart: number,
  featureEnd: number,
  nightingaleViewRange?: NightingaleViewRange
) =>
  nightingaleViewRange
    ? (nightingaleViewRange['display-start'] <= featureStart &&
        featureStart <= nightingaleViewRange['display-end']) ||
      (nightingaleViewRange['display-start'] <= featureEnd &&
        featureEnd <= nightingaleViewRange['display-end'])
    : true;
