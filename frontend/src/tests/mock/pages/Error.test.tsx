import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'
import { Link } from 'react-router-dom'

// fake component that has a link to non-existant page
function FakeComponent() {
  return (
    <Link to='notdefined' data-testid='fake-link'>
      Fake link
    </Link>
  )
}

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}));

describe('ErrorPage', async () => {
  beforeEach(async () => {
    render(<FakeComponent />, { wrapper: TestWrapper })
  })
  test('Error page shows up when navigating to non-existent page', async () => {
    await screen.findByText('Mock Dish 1')

    // Simulate user going to a url that is not defined.
    await userEvent.click(screen.getByTestId('fake-link'))
    expect(screen.getByText('This page does not exist.')).toBeDefined()
  })
  test('go back to main page from the error page using go back', async () => {
    await userEvent.click(screen.getByText('Go back'))
    await screen.findByText('Mock Dish 1')
    expect(screen.getByText('Mock Dish 1')).toBeDefined()
  })
  test('go back to main page from the error page using home', async () => {
    await userEvent.click(screen.getByText('Home'))
    await screen.findByText('Mock Dish 1')
    expect(screen.getByText('Mock Dish 1')).toBeDefined()
  })
})
