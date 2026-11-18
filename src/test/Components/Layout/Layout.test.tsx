import { render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Layout from '../../../components/Layout/Layout.tsx';

describe('Layout', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders its children inside the main area', () => {
    render(
      <Layout>
        <p>Hello</p>
      </Layout>,
    );

    expect(within(screen.getByRole('main')).getByText('Hello')).toBeInTheDocument();
  });

  it('has a navbar, a main area and a footer, in that order', () => {
    render(<Layout>content</Layout>);

    const banner = screen.getByRole('banner');
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    expect(banner.compareDocumentPosition(main) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(main.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('shows the current year in the footer', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2030-06-15T12:00:00Z'));

    render(<Layout>content</Layout>);

    expect(screen.getByRole('contentinfo')).toHaveTextContent('© 2030 AntreJeux');
  });
});
