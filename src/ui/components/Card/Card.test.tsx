import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card component", () => {
  it("renders children", () => {
    render(<Card><span>Test Content</span></Card>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
