import { describe, test, expect, beforeEach } from 'vitest';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import TestWrapper from 'src/tests/TestWrapper';
import userEvent from '@testing-library/user-event';

describe('Search', () => {
  beforeEach(async () => {
    render(<div />, {
      wrapper: TestWrapper,
    });
    // Wait for the data to arrive before testing
    await screen.findByText(
      'Miso-Butter Roast Chicken With Acorn Squash Panzanella'
    );
  });
  test('search should reduce number of food displays', async () => {
    const preSearchCount = screen.getAllByAltText('food').length;

    await userEvent.click(screen.getByPlaceholderText('Search'));
    await userEvent.keyboard('M');
    await userEvent.click(screen.getByAltText('searchicon'));

    await waitForElementToBeRemoved(screen.getByText("Newton's Law"));

    const postSearchCount = screen.getAllByAltText('food').length;

    expect(postSearchCount !== preSearchCount).toBeTruthy();
  });
  test('search by pressing enter', async () => {
    const preSearchCount = screen.getAllByAltText('food').length;

    await userEvent.click(screen.getByPlaceholderText('Search'));
    await userEvent.keyboard('iso');
    await userEvent.keyboard('{Enter}');

    await waitForElementToBeRemoved(
      screen.getByText('Thanksgiving Mac and Cheese')
    );
    const postSearchCount = screen.getAllByAltText('food').length;
    expect(postSearchCount !== preSearchCount).toBeTruthy();
  });
});
