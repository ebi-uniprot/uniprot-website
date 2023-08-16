import { HTMLAttributes } from 'react';
import ExternalLink from './ExternalLink';

import useCustomElement from '../hooks/useCustomElement';

import 'lite-youtube-embed/src/lite-yt-embed.css';

type Props = {
  videoid: string;
} & HTMLAttributes<HTMLSpanElement>;

const YouTubeEmbed = ({
  videoid,
  title,
  style,
  className,
  ...props
}: Props) => {
  const liteYouTube = useCustomElement(
    () =>
      import(/* webpackChunkName: "lite-youtube-embed" */ 'lite-youtube-embed'),
    'lite-youtube'
  );

  /* NOTE: privacy issue? When clicking, we embed YouTube in the website,
  with all the related tracking, might need to link to YouTube instead */
  return (
    <liteYouTube.name
      videoid={videoid}
      playlabel={title}
      style={{
        ...style,
        backgroundImage: `url('https://i.ytimg.com/vi/${videoid}/hqdefault.jpg')`,
      }}
      // Need to pass it to "class" instead of className because of the way
      // react handles this for custom elements
      class={className}
      {...props}
    >
      {liteYouTube.defined ? (
        <button className="lty-playbtn" type="button">
          <span className="visually-hidden">{title}</span>
        </button>
      ) : (
        <ExternalLink
          className="lty-playbtn"
          url={`https://www.youtube.com/watch?v=${videoid}`}
          noIcon
        >
          <span className="visually-hidden">{title}</span>
        </ExternalLink>
      )}
    </liteYouTube.name>
  );
};

export default YouTubeEmbed;
