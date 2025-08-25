import React from "react";
import { render, screen } from "@testing-library/react";
import Section from "./Section";

describe("Section component", () => {
  it("renders children", () => {
    render(<Section>Section Content</Section>);
    expect(screen.getByText("Section Content")).toBeInTheDocument();
  });

  it("applies light variant class by default", () => {
    render(<Section>Light</Section>);
    const section = screen.getByText("Light").closest("section");
    expect(section?.className).toContain("light");
  });

  it("applies dark variant class when specified", () => {
    render(<Section variant="dark">Dark</Section>);
    const section = screen.getByText("Dark").closest("section");
    expect(section?.className).toContain("dark");
  });
});
