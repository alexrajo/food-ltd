import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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
  test('should be no filters applied by default', () => {

    // Check that no filter icon is on screen by default (only shows up after at least one filter exist)
    expect(screen.queryAllByAltText('remove filter cross').length).toEqual(0)
  })
  test('should display applied filter', async () => {
    await userEvent.click(screen.getByTestId('searchsettingsquare'))
    await userEvent.click(screen.getAllByText('Search for ingredients')[0])
    await userEvent.keyboard('pepper{Enter}')
    await screen.findAllByAltText('remove filter cross')
    
    // Check that the filter icon shows up on screen
    expect(screen.getByAltText('remove filter cross')).toBeDefined()
  })
  test('remove a filter', async () => {
    await screen.findAllByAltText('remove filter cross')
    expect(screen.getByAltText('remove filter cross')).not.toBeNull()
    
    await userEvent.click(screen.getByText('Clear'))
    expect(screen.queryByAltText('remove filter cross')).toBeNull()
  })
  test('remove filter by clicking the cross', async () => {
    await userEvent.click(screen.getAllByText('Search for ingredients')[0])
    await userEvent.keyboard('pepper{Enter}')
    await screen.findAllByAltText('remove filter cross')

    // Close the menu
    await userEvent.click(screen.getByTestId('searchsettingsquare'))

    // Click the remove filter cross on the component itself (not using clear)
    await userEvent.click(screen.getByAltText('remove filter cross'))
    expect(screen.queryByText('pepper')).toBeNull()
  })
})
