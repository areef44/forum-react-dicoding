/**
 * skenario testing
 *
 * - CommentInput component
 *   - should handle content typing correctly
 *   - should call addComment function when add comment button is clicked
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CommentInput from './CommentInput';
import matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';

expect.extend(matchers);

describe('CommentInput', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle content typing correctly', async () => {
    // arrange
    render(<CommentInput handleSubmit={() => {}} />);
    const contentInput = screen.getByPlaceholderText('Add Comment Here');

    // action
    await userEvent.type(contentInput, 'contenttest');

    // assert
    expect(contentInput).toHaveValue('contenttest');
  });

  it('should call addComment function when add comment button is clicked', async () => {
    // arrange
    const mockCreateNewComment = vi.fn();
    const dummyThreadId = 'thread-1';

    render(
      <CommentInput
        addComment={mockCreateNewComment}
        threadId={dummyThreadId}
      />
    );

    const textarea = await screen.findByPlaceholderText('Add Comment Here');
    const button = await screen.findByRole('button', { name: /add comment/i });

    await userEvent.type(textarea, 'This is a test comment');
    await userEvent.click(button);

    expect(mockCreateNewComment).toHaveBeenCalledWith(
      expect.objectContaining({
        content: 'This is a test comment',
        threadId: dummyThreadId,
      })
    );

    expect(mockCreateNewComment).toHaveBeenCalledTimes(1);
  });
});
