import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('Header component renders correctly', () => {
    render(<Header />);
    const headerText = screen.getByText('My GitHub PRs Page');
    expect(headerText).toBeInTheDocument();
});
