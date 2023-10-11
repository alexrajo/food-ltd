import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestWrapper from 'src/tests/TestWrapper';
import userEvent from '@testing-library/user-event';

describe('SortBy', async () => {
  beforeEach(async () => {
    render(<div />, { wrapper: TestWrapper });

    // Wait for the data to arrive before testing
    await screen.findByText(
      'Miso-Butter Roast Chicken With Acorn Squash Panzanella'
    );
  });
  test('Sorting options exist', () => {
    expect(screen.findByText('New')).toBeDefined();
    expect(screen.findByText('Popular')).toBeDefined();
    expect(screen.findByText('A-Z')).toBeDefined();
  });
  test('should have changed style when clicked', async () => {

    // Selected options have different font than others
    expect(
      screen.getByText('New').className.includes('font-normal')
    ).toBeFalsy();
    
    await userEvent.click(screen.getByText('New'));

    expect(
      screen.getByText('New').className.includes('font-normal')
    ).toBeTruthy();
});
});
