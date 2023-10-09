import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestWrapper from 'src/tests/TestWrapper';

describe('FoodDisplay', () => {
  beforeEach(() => {
    render(<></>, {
      wrapper: TestWrapper,
    });
  });
  test('should find title of food', async () => {

    // Wait for the data to arrive
    await screen.findByText('Miso-Butter Roast Chicken With Acorn Squash Panzanella')

    // Find the image of food
    expect(screen.findByAltText("food image")).toBeDefined()
  });
});
