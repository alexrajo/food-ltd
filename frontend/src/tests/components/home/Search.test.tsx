import { describe, test, expect, beforeEach, vi } from 'vitest'
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'

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
