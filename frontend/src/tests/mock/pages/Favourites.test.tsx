import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

// there is currently no way to get to favorites (not implemented), so this is temporary
function FakeComponent() {
  return (
    <Link to='/favorites/' data-testid='fake-link'>
      Fake link
    </Link>
  )
}

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}));

describe('Favourites', async () => {
  beforeEach(async () => {
    render(<FakeComponent />, { wrapper: TestWrapper })
  })
  test('Navigate to favourite page', async () => {
    await screen.findByText('Mock Dish 1')

    // Simulate user going to favourite page.
    await userEvent.click(screen.getByTestId('fake-link'))
    expect(screen.getByText('av')).toBeDefined()
  })
})
