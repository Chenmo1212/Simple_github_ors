import { render, screen } from '@testing-library/react';
import Pagination from './Pagination';

test('Pagination component renders correctly', () => {
    render(<Pagination page={1} totalPages={3} onPageChange={() => {}} />)

    const firstPageButton = screen.getByText('First');
    const previousPageButton = screen.getByText('< Previous');
    const nextPageButton = screen.getByText('Next >');
    const lastPageButton = screen.getByText('Last');

    expect(firstPageButton).toBeInTheDocument();
    expect(previousPageButton).toBeInTheDocument();
    expect(nextPageButton).toBeInTheDocument();
    expect(lastPageButton).toBeInTheDocument();
});
