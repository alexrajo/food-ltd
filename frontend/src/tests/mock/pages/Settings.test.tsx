import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'
import { store } from 'src/redux/store'

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}));

describe('Settings', async () => {
  beforeEach(async () => {
    render(<div />, { wrapper: TestWrapper })
  })
  test('Navigate to settings page', async () => {
    await screen.findByText('Mock Dish 1')

    // Simulate user going to favourite page.
    await userEvent.click(screen.getByText('Settings'))
    expect(screen.getByText('Light mode')).toBeDefined()
  })
  test('Toggle light mode', async () => {
    const { value: initTheme } = store.getState().theme
    expect(initTheme === 'dark').toBeTruthy()

    await userEvent.click(screen.getByText('Light mode'))

    const { value: postTheme } = store.getState().theme

    expect(postTheme === 'light').toBeTruthy()
  })
  test('Toggle fahrenheit', async () => {
    const { value: initUnit } = store.getState().temperatureUnit
    expect(initUnit === 'fahrenheit').toBeTruthy() // we have fahreinheit as default?!

    await userEvent.click(screen.getByText('Fahrenheit')) // name of the button

    const { value: postUnit } = store.getState().temperatureUnit

    expect(postUnit === 'celsius').toBeTruthy()
  })
})
