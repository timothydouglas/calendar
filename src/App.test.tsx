import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  const env = { ...process.env};

  it('should render App with correct Title', () => {
    document.title = env.REACT_APP_SITE_TITLE;
    render(<App />);
    const header = screen.getByText(/DSNY Unavailability Manager/i);
    expect(header).toBeInTheDocument();
  })
});
