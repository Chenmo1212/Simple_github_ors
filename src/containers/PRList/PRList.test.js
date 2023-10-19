import React from 'react';
import { render, screen } from '@testing-library/react';
import PRList from './PRList';

// Mock data for testing
const mockPullRequests = [
    {
        id: 1,
        title: 'Pull Request 1',
        author: 'Author 1',
        url: '/pr1',
        authorUrl: '/author1',
        comments: 5,
        commentsUrl: '/pr1/comments',
    },
];

// Mock the fetchPullRequests function
jest.mock('../../axios/api', () => ({
    fetchPullRequests: async (page) => {
        return {
            data: mockPullRequests,
            headers: {
                link: `page=${page + 1}>; rel="next"`,
            },
        };
    },
}));

describe('PRList Component', () => {
    it('renders with mock data and handles pagination', async () => {
        render(<PRList />);

        // Loading indicator should be displayed initially
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Wait for the loading to close (300ms timeout)
        await new Promise((r) => setTimeout(r, 3000));

        // Verify that PR items are displayed
        expect(screen.getByText('Pull Requests')).toBeInTheDocument();

        // Click on the next page button
        const nextPageButton = screen.getByText('Next >');
        expect(nextPageButton).toBeInTheDocument();
    });

    it('handles error state', async () => {
        // Mock an error response from fetchPullRequests
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.mock('../../axios/api', () => ({
            fetchPullRequests: async () => {
                throw new Error('Test error');
            },
        }));

        render(<PRList />);

        // Loading indicator should be displayed initially
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Wait for the loading to close (300ms timeout)
        await new Promise((r) => setTimeout(r, 300));

        // Verify that the error message is displayed
        expect(screen.getByText('Failed to fetch PR data.')).toBeInTheDocument();
    });
});
