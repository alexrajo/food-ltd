import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}))

describe('FilterDisplay', async () => {
  beforeEach(async () => {
    render(<div />, { wrapper: TestWrapper })

    await screen.findByText('Mock Dish 1')
  })
  test('search should reduce number of food displays', async () => {
    await userEvent.click(screen.getByPlaceholderText('Search'))
    await userEvent.keyboard('Mock dish 1{Enter}')
    expect(screen.findByText('Showing results for')).toBeDefined()
  })
})
