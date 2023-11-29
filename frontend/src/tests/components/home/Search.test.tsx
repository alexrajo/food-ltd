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
    await screen.findByText('Showing results for: "Mock dish 1"')
    expect(screen.findByText('Showing results for: "Mock dish 1"')).toBeDefined()
  })
  test('close search window', async () => {
    await userEvent.click(screen.getByPlaceholderText('Search'))
    await userEvent.keyboard('Mockk')
    await screen.findByTestId('remove search input')
    await userEvent.click(screen.getByTestId('remove search input'))
  })
  test('clear history', async () => {
    await userEvent.click(screen.getByPlaceholderText('Search'))
    await userEvent.keyboard("{backspace}".repeat(13))
    await screen.findByText('Clear history')
    await userEvent.click(screen.getByText('Clear history'))
    await userEvent.click(screen.getByPlaceholderText('Search'))
    expect(screen.getByText('No suggestions')).toBeDefined()
  })
  test('remove search history element', async () => {
    await userEvent.click(screen.getByPlaceholderText('Search'))
    await userEvent.keyboard('Mock dish 1{Enter}')
    await screen.findByTestId('remove search input')
    await userEvent.click(screen.getByTestId('remove search input'))
    await userEvent.click(screen.getByPlaceholderText('Search'))
    await userEvent.click(screen.getByText('Remove'))
    await userEvent.click(screen.getByPlaceholderText('Search'))
    expect(screen.getByText('No suggestions')).toBeDefined()
  })
  test('search by using button', async () => {
    await userEvent.click(screen.getByPlaceholderText('Search'))
    await userEvent.keyboard('Mock dish 1')
    await userEvent.click(screen.getByTestId('search for Mock dish 1'))
    await screen.findByText('Showing results for: "Mock dish 1"')
    expect(screen.findByText('Showing results for: "Mock dish 1"')).toBeDefined()
  })
  test('select a search alternative', async () => {
    await userEvent.click(screen.getByPlaceholderText('Search'))
    await userEvent.keyboard('Mock Dish')
    await screen.findByAltText('search result number 1')
    await userEvent.click(screen.getByAltText('search result number 1'))
    await screen.findByText('Temperature units')
    expect(screen.getByText('Temperature units'))
  })
})
