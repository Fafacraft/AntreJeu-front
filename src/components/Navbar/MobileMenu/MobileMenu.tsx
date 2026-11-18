import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { NavItem } from '../NavItems/NavItems';
import './MobileMenu.css';

type MobileMenuProps = {
  items: NavItem[];
};

export default function MobileMenu({ items }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // While open: focus the close button, close on Escape, lock page scroll.
  useEffect(() => {
    if (!open) return undefined;

    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  // If the window grows to desktop size, the drawer must not stay open.
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;

    const query = window.matchMedia('(min-width: 48rem)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <div className="mobile-menu">
      <button
        ref={toggleRef}
        type="button"
        className="mobile-menu__button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen(true)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {open && (
        <>
          <div className="mobile-menu__overlay" data-testid="menu-overlay" aria-hidden="true" onClick={close} />
          <div id={panelId} className="mobile-menu__panel" role="dialog" aria-modal="true" aria-label="Menu">
            <div className="mobile-menu__header">
              <span className="mobile-menu__title">AntreJeux</span>
              <button
                ref={closeRef}
                type="button"
                className="mobile-menu__button"
                aria-label="Close menu"
                onClick={close}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile">
              <ul className="mobile-menu__list">
                {items.map((item) => (
                  <li key={item.path}>
                    <a className="mobile-menu__link" href={item.path} onClick={close}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
