import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestWrapper from 'src/tests/TestWrapper';
import userEvent from '@testing-library/user-event';

describe('AddFilter', () => {
  beforeEach(async () => {
    render(<></>, {
      wrapper: TestWrapper,
    });
    // Wait for the data to arrive
    await screen.findByText(
      'Miso-Butter Roast Chicken With Acorn Squash Panzanella'
    );
  });
  test('add filter', async () => {
    expect(screen.queryAllByAltText('remove filter cross').length).toEqual(0);
    await userEvent.click(screen.getByText('include ingredients')); // Click the dropdown menu
    await userEvent.click(screen.getByText('Chicken')); // add the Include: Chicken filter
    expect(screen.getAllByAltText('remove filter cross').length).toEqual(1);
});
test('remove filter', async () => {
    expect(screen.getAllByAltText('remove filter cross').length).toEqual(1);
    await userEvent.click(screen.getByText('include ingredients')); // Click the dropdown menu
    await userEvent.click(screen.getAllByText('Chicken')[0]); // add the Include: Chicken filter
    expect(screen.queryAllByAltText('remove filter cross').length).toEqual(0);
  })
});
