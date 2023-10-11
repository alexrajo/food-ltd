import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestWrapper from 'src/tests/TestWrapper';

describe('FoodGallery', () => {
  beforeEach(async () => {
    render(<div />, {
      wrapper: TestWrapper,
    });
    // Wait for the data to arrive before testing
    await screen.findByText(
      'Miso-Butter Roast Chicken With Acorn Squash Panzanella'
    );
  });
  test('should load Food display components', () => {
    expect(screen.queryAllByAltText('food').length).toBeGreaterThan(0);
  });
});
