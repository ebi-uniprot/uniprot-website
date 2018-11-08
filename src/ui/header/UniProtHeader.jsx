import React from 'react';
import { Header } from 'franklin-sites';
import { Link } from 'react-router-dom';

import Logo from '../../svg/uniprot-rgb.svg';

const UniProtHeader = () => (
  <Header>
    <a className="header__logo" href="/">
      <Logo width={120} height={50} />
    </a>
    <ul className="header__navigation">
      <li>
        <Link to="/">BLAST</Link>
      </li>
      <li>
        <Link to="/">Aligh</Link>
      </li>
      <li>
        <Link to="/">Peptide search</Link>
      </li>
      <li>
        <Link to="/">Retrieve/ID Mapping</Link>
      </li>
      <li>
        <Link to="/">API</Link>
      </li>
      <li>
        <Link to="/">Help</Link>
      </li>
    </ul>
    <div>
      <input type="text" />
      <button type="button" className="button">
        Search
      </button>
    </div>
    <Link to="/advanced-search">Advanced search</Link>
  </Header>
);

export default UniProtHeader;
