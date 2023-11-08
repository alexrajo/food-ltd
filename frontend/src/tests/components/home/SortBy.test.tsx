import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}));

describe('sortby', async () => {
  beforeEach(async () => {
    render(<div />, { wrapper: TestWrapper })

    await screen.findByText('Mock Dish 1')
  })
  test('Sorting options exist', () => {
    expect(screen.getByText('Popular')).toBeDefined()
    expect(screen.getByText('Rating')).toBeDefined()
    expect(screen.getByText('A-Z')).toBeDefined()
  })
  test('should have changed style when clicked', async () => {
    // Selected options have different font than others
    expect(
      screen.getByText('Rating').className.includes('font-normal'),
    ).toBeFalsy()

    await userEvent.click(screen.getByText('Rating'))

    expect(
      screen.getByText('Rating').className.includes('font-normal'),
    ).toBeTruthy()
  })
})
