import { ExternalLink } from 'franklin-sites';

import useCustomElement from '../hooks/useCustomElement';

const YouTubeEmbed = ({ id, title }: { id: string; title: string }) => {
  const liteYouTube = useCustomElement(
    () =>
      import(/* webpackChunkName: "lite-youtube-embed" */ 'lite-youtube-embed'),
    'lite-youtube'
  );

  /* NOTE: privacy issue? When clicking, we embed YouTube in the website,
  with all the related tracking, might need to link to YouTube instead */
  return (
    <liteYouTube.name
      videoid={id}
      playlabel={title}
      style={{
        backgroundImage: `url('https://i.ytimg.com/vi/${id}/hqdefault.jpg')`,
      }}
    >
      {liteYouTube.defined ? (
        <button className="lty-playbtn" type="button">
          <span className="visually-hidden">{title}</span>
        </button>
      ) : (
        <ExternalLink
          className="lty-playbtn"
          url={`https://www.youtube.com/watch?v=${id}`}
          noIcon
        >
          <span className="visually-hidden">{title}</span>
        </ExternalLink>
      )}
    </liteYouTube.name>
  );
};

export default YouTubeEmbed;
