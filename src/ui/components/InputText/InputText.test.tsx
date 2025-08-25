import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputText from "./InputText";

describe("InputText component", () => {
  it("renders with placeholder and name", () => {
    render(<InputText name="username" placeholder="Enter username" />);
    const input = screen.getByPlaceholderText("Enter username");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "username");
  });

  it("accepts value and required props", () => {
    render(<InputText name="email" placeholder="Email" value="test@example.com" required />);
    const input = screen.getByDisplayValue("test@example.com");
    expect(input).toBeRequired();
  });

  it("calls onChange when input changes", () => {
    const handleChange = jest.fn();
    render(<InputText name="test" placeholder="Test" onChange={handleChange} />);
    fireEvent.change(screen.getByPlaceholderText("Test"), { target: { value: "abc" } });
    expect(handleChange).toHaveBeenCalled();
  });
});
