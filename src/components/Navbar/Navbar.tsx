import MobileMenu from './MobileMenu/MobileMenu';
import { NAV_ITEMS } from './NavItems/NavItems';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        {/* Mobile: burger + left drawer. Hidden from the breakpoint up. */}
        <MobileMenu items={NAV_ITEMS} />

        <a className="navbar__brand" href="/">
          AntreJeux
        </a>

        {/* Desktop: tabs. Hidden below the breakpoint (see Navbar.css). */}
        <nav className="navbar__tabs" aria-label="Main">
          <ul className="navbar__list">
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <a className="navbar__tab" href={item.path}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
