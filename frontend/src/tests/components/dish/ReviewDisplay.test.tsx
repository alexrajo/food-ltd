import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'
import ReviewDisplay from 'src/components/dish/ReviewDisplay'

// Mock lottie to not run pointless animations in the test
vi.mock('lottie-react', () => {
  return {
    default: ({
      animationData,
      loop,
      className,
    }: {
      animationData: string
      loop: boolean
      className: string
    }) => <div>{loop}</div>,
  }
})

describe('ReviewDisplay', async () => {
  beforeEach(async () => {
    render(<div />, { wrapper: TestWrapper })

    await screen.findByText('Mock Dish 1')
  })
  test('Find the review posted on mock dish 1', async () => {
    await userEvent.click(screen.getByText('Mock Dish 1'))
    await screen.findByText('Great Dish!')
    expect(screen.getByText('Great Dish!')).toBeDefined()
  })
  test('Do not find the review posted on mock dish 2', async () => {
    await userEvent.click(screen.getByText('Mock Dish 1'))
    await screen.findByText('Great Dish!')
    expect(screen.queryByText('Delicious!')).toBeNull()
  })
})
