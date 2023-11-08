import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}));

describe('FilterDisplay', async () => {
  beforeEach(async () => {
    render(<div />, { wrapper: TestWrapper })

    await screen.findByText('Mock Dish 1')
  })
  test('should load Food display components', () => {
    expect(screen.queryAllByAltText('food').length).toBeGreaterThan(0)
  })
})
