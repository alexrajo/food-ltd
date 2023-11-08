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
    await screen.findByText('Mock Dish 1')
  })
  test('mock dish 1 has 5 stars', () => {
    // Find the 5 first stars on the page, they belong to mock dish 1
    const stars = screen.getAllByAltText('star').slice(0, 5)

    stars.forEach((image) => {
      const src = image.getAttribute('src')
      expect(src).toBe('/project2/src/assets/star.svg')
    })
  })
  test('mock dish 2 has 4 stars', () => {
    // Find the next 5 first stars on the page, they belong to mock dish 1
    const stars = screen.getAllByAltText('star').slice(5, 10)

    stars.slice(0, 4).forEach((image) => {
      const src = image.getAttribute('src')
      expect(src).toBe('/project2/src/assets/star.svg')
    })
    expect(stars[4].getAttribute('src')).toBe(
      '/project2/src/assets/outline-star.svg',
    )
  })
})
