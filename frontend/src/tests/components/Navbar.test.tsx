import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}));

describe('Navbar', async () => {
  beforeEach(async () => {
    render(<div />, { wrapper: TestWrapper })
  })
  test('can open settings', async () => {
    await screen.findByText('Mock Dish 1')
    // Go to settings page
    await userEvent.click(screen.getByText('Settings'))

    // Shows that the page has been switched
    await screen.findByText('Light mode')
    expect(screen.getByText('Light mode')).toBeDefined()
  })

  test('Can go back to main menu', async () => {
    // Go home
    await userEvent.click(screen.getByText('Home'))

    // Only exist on the main page
    await screen.findByText('Popular')
    expect(screen.getByText('Popular')).toBeDefined()
  })
})
