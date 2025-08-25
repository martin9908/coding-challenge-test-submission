import React from "react";
import { render, screen } from "@testing-library/react";
import Address, { AddressProps } from "./Address";

describe("Address component", () => {
  it("renders the formatted address", () => {
    const props: AddressProps = {
      street: "Main St",
      houseNumber: "123",
      postcode: "45678",
      city: "Springfield",
    };

    render(<Address {...props} />);
    const expectedText = "Main St 123, 45678, Springfield";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
