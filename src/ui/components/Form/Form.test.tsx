import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form component", () => {
  it("renders legend and submit button", () => {
    render(
      <Form legend="Test Legend" submitLabel="Submit" onSubmit={() => {}} />
    );
    expect(screen.getByText("Test Legend")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("renders form entries", () => {
    render(
      <Form
        legend="Legend"
        submitLabel="Go"
        onSubmit={() => {}}
        formEntries={[
          { name: "firstName", placeholder: "First Name" },
          { name: "lastName", placeholder: "Last Name" },
        ]}
      />
    );
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", () => {
    const handleSubmit = jest.fn((e) => e.preventDefault());
    render(<Form legend="Legend" submitLabel="Send" onSubmit={handleSubmit} />);
    fireEvent.submit(screen.getByRole("form"));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
