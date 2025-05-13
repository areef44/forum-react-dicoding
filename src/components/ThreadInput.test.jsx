/**
 * skenario testing
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle content typing correctly
 *   - should call handleSubmit function when create new thread button is clicked
 */

import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ThreadInput from "./ThreadInput";
import userEvent from "@testing-library/user-event";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

describe("ThreadInput Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("should handle title typing correctly", async () => {
    // arrange
    render(<ThreadInput handleSubmit={() => {}} />);
    const titleInput = screen.getByPlaceholderText("Insert Title");

    // action
    await userEvent.type(titleInput, "titletest");

    // assert
    expect(titleInput).toHaveValue("titletest");
  });

  it("should handle category typing correctly", async () => {
    // arrange
    render(<ThreadInput handleSubmit={() => {}}/>)
    const categoryInput = screen.getByPlaceholderText("Insert Category");

    // action
    await userEvent.type(categoryInput, 'categorytest')

    // assert
    expect(categoryInput, 'categorytest')
  })

  it("should handle content typing correctly", async () => {
    // arrange
    render(<ThreadInput handleSubmit={() => {}}/>)
    const contentInput = screen.getByPlaceholderText("Insert Content");

    // action
    await userEvent.type(contentInput, 'contenttest')

    // assert
    expect(contentInput, 'contenttest')
  })

  it("should call handleSubmit function when create new thread button is clicked", async () => {
    // arrange
    const mockCreateNewThread = vi.fn();
    render(<ThreadInput addThread={mockCreateNewThread}/>)
    const titleInput = await screen.getByPlaceholderText('Insert Title');
    await userEvent.type(titleInput, 'titletest');
    const categoryInput = await screen.getByPlaceholderText('Insert Category');
    await userEvent.type(categoryInput, 'categorytest');
    const contentInput = await screen.getByPlaceholderText('Insert Content')
    await userEvent.type(contentInput, 'contenttest')
    const createThreadButton = await screen.getByRole('button', {name: 'Create New Thread'})

    // action
    await userEvent.click(createThreadButton);

    // assert
    expect(mockCreateNewThread).toBeCalledWith({
        title: 'titletest',
        category: 'categorytest',
        body: 'contenttest'
    })
  })
});
