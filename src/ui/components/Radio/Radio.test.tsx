import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Radio from "./Radio";

describe("Radio component", () => {
  it("renders label and input", () => {
    render(<Radio id="option1" name="group1">Option 1</Radio>);
    expect(screen.getByLabelText("Option 1")).toBeInTheDocument();
    expect(screen.getByRole("radio")).toHaveAttribute("id", "option1");
    expect(screen.getByRole("radio")).toHaveAttribute("name", "group1");
  });

  it("sets checked state", () => {
    render(<Radio id="option2" name="group1" checked>Option 2</Radio>);
    expect(screen.getByRole("radio")).toBeChecked();
  });

  it("calls onChange when selected", () => {
    const handleChange = jest.fn();
    render(<Radio id="option3" name="group1" onChange={handleChange}>Option 3</Radio>);
    fireEvent.click(screen.getByRole("radio"));
    expect(handleChange).toHaveBeenCalled();
  });
});
