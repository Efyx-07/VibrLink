import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './test-utils';
import NewLinkPage from '../pages/NewLinkPage';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('NewLinkForm component', () => {

  // test for the render of the form
  /*it('should render the form correctly', () => {
    renderWithRouter(
        <NewLinkPage />
    );

    expect(screen.getByLabelText(/Enter your release Spotify id:/i)).toBeInTheDocument();
    expect(screen.getByText("Create your link")).toBeInTheDocument();
  }); */

  it('should display error message for invalid Spotify id', async () => {
    renderWithRouter(
        <NewLinkPage />
    );

    userEvent.type(screen.getByLabelText(/Enter your release Spotify id:/i), 'invalid_id');

    userEvent.click(screen.getByText("Create your link"));
    
    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
    });
  });

});