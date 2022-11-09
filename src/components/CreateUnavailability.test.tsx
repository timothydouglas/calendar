import { render, screen } from "@testing-library/react";
import { CreateUnavailability } from "./CreateUnavailability";


describe('CreateUnavailability', () => {
  it('should instantiate button with label', () => {
    render(<CreateUnavailability />);
    const unavailabilityButton: any = screen.getByTestId('create-unavailability');
    const buttonLabel: any = screen.getByTestId('create-button-label');

    expect(unavailabilityButton).toContainElement(buttonLabel);
  })

  it('should set label within button', () => {
    render(<CreateUnavailability />);
    const buttonLabel: any = screen.getByTestId('create-button-label');

    expect(buttonLabel).toHaveTextContent('Create');
  })
});
