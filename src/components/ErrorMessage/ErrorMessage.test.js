import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

test('ErrorMessage component renders correctly', () => {
    render(<ErrorMessage message="An error occurred" />);
    const errorMessage = screen.getByText('An error occurred');
    expect(errorMessage).toBeInTheDocument();
});
