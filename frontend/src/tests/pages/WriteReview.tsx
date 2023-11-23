import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}))

describe('WriteReview', async () => {
  beforeEach(async () => {
    render(<div />, { wrapper: TestWrapper })
    await screen.findByText('Mock Dish 1')
  })
  test('should be possible to navigate to review page', async () => {
    await userEvent.click(screen.getByText('Mock Dish 1'))
    await screen.findByText('Write a review')
    await userEvent.click(screen.getByText('Write a review'))
    await screen.findByText('Post a review')
    expect(screen.getByText('Title')).toBeDefined()
    expect(screen.getByText('Comment')).toBeDefined()
    expect(screen.getByText('Rating')).toBeDefined()
  })
  test('should be possible to write comment', async () => {
    await screen.findByText('Cancel')
    await userEvent.click(screen.getByTestId('comment-area'))
    await userEvent.keyboard('hello')
  })
  test('should be possible to leave review page', async () => {
    await screen.findByText('Cancel')
    await userEvent.click(screen.getByText('Cancel'))
    await screen.findByText('Mock Dish 1')
    expect(screen.getByText('Mock Dish 1')).toBeDefined()
  })
})
