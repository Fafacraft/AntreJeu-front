import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Navbar from '../../../components/Navbar/Navbar';
import { NAV_ITEMS } from '../../../components/Navbar/NavItems/NavItems';

describe('Navbar', () => {
  it('links the brand name to the home page', () => {
    render(<Navbar />);

    expect(screen.getByRole('link', { name: 'AntreJeux' })).toHaveAttribute('href', '/');
  });

  it('lists every nav item in the desktop navigation', () => {
    render(<Navbar />);

    const nav = screen.getByRole('navigation', { name: 'Main' });
    for (const item of NAV_ITEMS) {
      expect(within(nav).getByRole('link', { name: item.label })).toHaveAttribute('href', item.path);
    }
  });
});

describe('Navbar mobile menu', () => {
  it('is closed by default', () => {
    render(<Navbar />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens with the same items as the desktop tabs', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    const dialog = screen.getByRole('dialog', { name: 'Menu' });
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'true');
    for (const item of NAV_ITEMS) {
      expect(within(dialog).getByRole('link', { name: item.label })).toHaveAttribute('href', item.path);
    }
  });

  it('moves focus to the close button when opened', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveFocus();
  });

  it('closes with the close button and gives focus back to the burger', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByRole('button', { name: 'Close menu' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
  });

  it('closes with the Escape key', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when the overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    await user.click(screen.getByTestId('menu-overlay'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when a link is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const dialog = screen.getByRole('dialog', { name: 'Menu' });
    // jsdom can't navigate: cancel the default action of the link click
    dialog.addEventListener('click', (event) => event.preventDefault());
    await user.click(within(dialog).getByRole('link', { name: NAV_ITEMS[1].label }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('locks page scroll while open and restores it on close', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');
    expect(document.body.style.overflow).toBe('');
  });
});
