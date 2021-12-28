import { useLocation, Link } from 'react-router-dom';

import './bread-crumbs.css';

import { ROUTES } from '../../utils/constants';

export default function BreadCrumbs({ currentBreadCrumbs, changeBreadCrumbs }) {
  const location = useLocation();
  const route = location.pathname;
  const handleLinkClick = () => {
    changeBreadCrumbs('');
  };
  return (
    <nav className="bread-crumbs">
      <ul className="bread-crumbs__list">
        <li className="bread-crumbs__item">
          <Link className="bread-crumbs__link" to={ROUTES.root} onClick={handleLinkClick}>
            {route === ROUTES.root ? 'International' : 'Issue Boards'}
          </Link>
          <div className="bread-crumbs__divisor"></div>
        </li>
        <li className="bread-crumbs__item">
          <p className="bread-crumbs__text">{currentBreadCrumbs || 'Issue Boards'}</p>
        </li>
      </ul>
    </nav>
  );
}
