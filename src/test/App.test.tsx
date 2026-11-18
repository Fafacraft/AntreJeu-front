import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders the page inside the shared layout', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(within(screen.getByRole('main')).getByText('Page content goes here.')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
