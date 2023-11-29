import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}))

describe('Dish page', async () => {
  beforeEach(async () => {
    render(<div />, { wrapper: TestWrapper })
    await screen.findByText('Mock Dish 1')

  })
  test('navigate to dish page', async () => {
    await userEvent.click(screen.getByText('Mock Dish 1'))
    expect(screen.getByText('Temperature units')).toBeDefined()
  })
  test('Change to Celsius units', async () => {
    await userEvent.click(screen.getByText('Celsius'))
    
  })
})
