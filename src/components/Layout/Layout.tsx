import type { ReactNode } from 'react';
import Navbar from '../Navbar/Navbar';
import './Layout.css';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Navbar />

      <main className="layout__main">
        <div className="container">{children}</div>
      </main>

      <footer className="layout__footer">
        <div className="container">© {new Date().getFullYear()} AntreJeux</div>
      </footer>
    </div>
  );
}
