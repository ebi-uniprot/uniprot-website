/* eslint-disable uniprot-website/use-config-location */
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './styles/illustrated-list-tile.module.scss';

const IllustratedListTile = ({ title, image, linkList, moreTo }) => (
  <div className={styles['illustrated-list-tile']}>
    <h3>{title}</h3>
    <div className={styles['illustrated-list-tile__content']}>
      <div className={styles['illustrated-list-tile__content__image']}>
        {image}
      </div>
      <ul
        className={cn(
          styles['illustrated-list-tile__content__list'],
          'no-bullet'
        )}
      >
        {linkList.map(({ label, to, url }) => (
          <li key={label}>
            {to ? <Link to={to}>{label}</Link> : <a href={url}>{label}</a>}
          </li>
        ))}
      </ul>
    </div>
    <div className={styles['illustrated-list-tile__more-link']}>
      <Link to={moreTo}>More</Link>
    </div>
  </div>
);

export default IllustratedListTile;
