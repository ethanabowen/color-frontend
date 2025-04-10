import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorForm } from './ColorForm';
import { submitColor } from '../services/api';

// Mock the API module
vi.mock('../services/api', () => ({
  submitColor: vi.fn().mockResolvedValue(undefined),
}));

describe('ColorForm', () => {
  it('renders form elements correctly', () => {
    render(<ColorForm />);
    
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const onSuccess = vi.fn();
    render(<ColorForm onSuccess={onSuccess} />);
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const colorInput = screen.getByLabelText(/color/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(firstNameInput, 'John');
    await userEvent.type(colorInput, 'blue');
    await userEvent.click(submitButton);

    expect(submitColor).toHaveBeenCalledWith({
      firstName: 'John',
      color: 'blue',
    });
    expect(await screen.findByText(/color submitted successfully/i)).toBeInTheDocument();
    expect(onSuccess).toHaveBeenCalled();
  });

  it('shows validation errors for empty fields', async () => {
    render(<ColorForm />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/color is required/i)).toBeInTheDocument();
  });

  it('shows error message when submission fails', async () => {
    const error = new Error('API Error');
    (submitColor as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(error);

    render(<ColorForm />);
    
    const firstNameInput = screen.getByLabelText(/first name/i);
    const colorInput = screen.getByLabelText(/color/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await userEvent.type(firstNameInput, 'John');
    await userEvent.type(colorInput, 'blue');
    await userEvent.click(submitButton);

    expect(await screen.findByText('API Error')).toBeInTheDocument();
  });
}); 