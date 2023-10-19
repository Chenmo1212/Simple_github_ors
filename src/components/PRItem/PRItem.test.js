import { render, screen } from '@testing-library/react';
import PRItem from './PRItem';

test('PRItem component renders correctly', () => {
    render(
        <PRItem
            title="Sample PR"
            url="/pr/1"
            author="John Doe"
            comments={5}
            commentsUrl="/pr/1/comments"
        />
    );

    const title = screen.getByText('Sample PR');
    const author = screen.getByText('John Doe');
    const comments = screen.getByText('5');

    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();
    expect(comments).toBeInTheDocument();
});
