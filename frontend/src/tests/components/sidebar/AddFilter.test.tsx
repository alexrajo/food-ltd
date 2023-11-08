import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}))

describe('add filter', async () => {
  beforeEach(async () => {
    render(<div />, { wrapper: TestWrapper })

    await screen.findByText('Mock Dish 1')
  })
  test('add filter', async () => {
    expect(screen.queryAllByAltText('remove filter cross').length).toEqual(0)
    await userEvent.click(screen.getByTestId('searchsettingsquare'))
    await userEvent.click(screen.getAllByText('Search for ingredients')[0])
    await userEvent.keyboard('pepper{Enter}')
    await screen.findAllByAltText('remove filter cross')
    expect(screen.getAllByAltText('remove filter cross').length).toEqual(1)
  })
  test('remove filter', async () => {
    expect(screen.getAllByAltText('remove filter cross').length).toEqual(1)
    expect(screen.getByAltText('remove filter cross')).not.toBeNull()
    await userEvent.click(screen.getByText('Clear'))
    expect(screen.queryAllByAltText('remove filter cross').length).toEqual(0)
  })
})
