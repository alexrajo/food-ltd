import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TestWrapper from 'src/tests/TestWrapper'
import userEvent from '@testing-library/user-event'
import Placeholder from 'src/components/dish/DisplayPlaceholder'

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}))

describe('DisplayPlaceholder', async () => {
  beforeEach(async () => {
    render(<Placeholder />)    
  })
  test('Correct rendering', () => {
    expect(screen.getByRole('presentation')).toBeDefined()
  })
})