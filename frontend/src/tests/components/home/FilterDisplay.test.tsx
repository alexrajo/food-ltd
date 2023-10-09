import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestWrapper from 'src/tests/TestWrapper';
import userEvent from '@testing-library/user-event';

describe('FilterDisplay', async() => {
  beforeEach( async () => {
    render(<></>, { wrapper: TestWrapper })

    // Wait for the data to arrive before testing
    await screen.findByText('Miso-Butter Roast Chicken With Acorn Squash Panzanella')
  })
  test('should be no filters applied by default', () => {
    expect(screen.queryAllByAltText('remove filter cross').length).toEqual(0)
  });
  test('add a filter', async () => {

    await userEvent.click(screen.getByText('include ingredients')); // Click the dropdown menu
    await userEvent.click(screen.getByText('Chicken')); // add the Include: Chicken filter
    
    expect(screen.getByAltText('remove filter cross')).toBeDefined()
  });
  test('remove a filter', async () => {
    
    expect(screen.queryAllByAltText('remove filter cross')).not.toBeNull();
    
    // Remove the filter by clicking the x.
    await userEvent.click(screen.getByAltText('remove filter cross'))
    expect(screen.queryByAltText('remove filter cross')).toBeNull();  
  });
  test('remove excluding filter', async () => {
    
    // Add excluding filter
    await userEvent.click(screen.getByText('exclude ingredients')); 
    await userEvent.click(screen.getByText('Milk'));

    // Remove the filter by clicking the x.
    await userEvent.click(screen.getByAltText('remove filter cross'))
    expect(screen.queryByAltText('remove filter cross')).toBeNull();  
    
  })
});

