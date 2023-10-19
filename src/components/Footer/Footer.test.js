import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Footer component renders correctly', () => {
    render(<Footer />);
    const footerText = screen.getByText('© 2023 My GitHub PRs App');
    expect(footerText).toBeInTheDocument();
});
