import cn from 'classnames';
import { ReactElement } from 'react';
import { Link, type LinkProps } from 'react-router';
import { RequireExactlyOne } from 'type-fest';

import styles from './styles/illustrated-list-tile.module.scss';

type LinkOrHref = RequireExactlyOne<
  {
    label: string;
    to: LinkProps['to'];
    url: string;
  },
  'to' | 'url'
>;

export type IllustratedListTileProps = {
  title: string;
  image: ReactElement;
  linkList: LinkOrHref[];
  moreTo: LinkProps['to'];
};

const IllustratedListTile = ({
  title,
  image,
  linkList,
  moreTo,
}: IllustratedListTileProps) => (
  <div className={styles['illustrated-list-tile']}>
    <h2 className={cn(styles['illustrated-list-tile__heading'], 'medium')}>
      {title}
    </h2>
    <div className={styles['illustrated-list-tile__image']}>{image}</div>
    <ul className={cn(styles['illustrated-list-tile__list'], 'no-bullet')}>
      {linkList.map(({ label, to, url }) => (
        <li key={label}>
          {to ? <Link to={to}>{label}</Link> : <a href={url}>{label}</a>}
        </li>
      ))}
    </ul>
    <Link className={styles['illustrated-list-tile__more']} to={moreTo}>
      More
    </Link>
  </div>
);

export default IllustratedListTile;
