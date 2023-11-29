import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import FoodDisplaySkeleton from 'src/components/home/FoodDisplaySkeleton'

vi.mock('lottie-react', () => ({
  default: vi.fn(),
}))

describe('FoodDisplaySkeleton', async () => {
  beforeEach(async () => {
    render(<FoodDisplaySkeleton />)    
  })
  test('Correct rendering', () => {
    expect(screen.getByTestId('skeleton')).toBeDefined()
  })
})