import { render, screen } from "@testing-library/react";
import { Sidebar } from "./Sidebar";


describe('Sidebar', () => {
  it('should instantiate sidebar with Create Unavailability Button', () => {
    render(<Sidebar />);
    const sidebar: any = screen.getByTestId('sidebar');
    const button: any = screen.getByTestId('create-unavailability')
    expect(sidebar).toContainElement(button);
  })
})
