'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.wrapper}>
          <Link className={css.logo} href="/">
            <svg
              className={css.logoIcon}
              width="104"
              height="16"
            >
              <use href="/sprite.svg#icon-Logo" />
            </svg>
          </Link>
          <nav className={css.nav} aria-label="Main navigation">
            <ul className={css.listHeader}>
              <li>
                <Link
                  href="/"
                  className={`${css.listNavItem} ${pathname === '/' ? css.active : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog"
                  className={`${css.listNavItem} ${
                    pathname.startsWith('/catalog') ? css.active : ''
                  }`}
                >
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
