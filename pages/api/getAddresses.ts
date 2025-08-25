import type { NextApiRequest, NextApiResponse } from "next";
import generateMockAddresses from "../../src/utils/generateMockAddresses";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { postcode, streetnumber },
  } = req;

  if (!postcode || !streetnumber) {
    return res.status(400).send({
      status: "error",
      // DO NOT MODIFY MSG - used for grading
      errormessage: "Postcode and street number fields mandatory!",
    });
  }

  if ((postcode as string).length < 4) {
    return res.status(400).send({
      status: "error",
      // DO NOT MODIFY MSG - used for grading
      errormessage: "Postcode must be at least 4 digits!",
    });
  }

  /** Validation: ensure input value is all digits and non-negative */
  const isStrictlyNumeric = (value: string) => /^\d+$/.test(value);

  /** Shared validator to avoid code duplication */
  const validateField = (
    value: string,
    errorMessage: string
  ): boolean | void => {
    if (!isStrictlyNumeric(value)) {
      res.status(400).send({
        status: "error",
        errormessage: errorMessage,
      });
      return false;
    }
    return true;
  };

  // Reuse the same validation function for both fields
  if (
    !validateField(
      postcode as string,
      "Postcode must be all digits and non negative!"
    ) ||
    !validateField(
      streetnumber as string,
      "Street Number must be all digits and non negative!"
    )
  ) {
    return;
  }

  // Generate mock addresses
  const mockAddresses = generateMockAddresses(
    postcode as string,
    streetnumber as string
  );

  if (mockAddresses) {
    const timeout = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    // delay the response by 500ms - for loading status check
    await timeout(500);
    return res.status(200).json({
      status: "ok",
      details: mockAddresses,
    });
  }

  return res.status(404).json({
    status: "error",
    // DO NOT MODIFY MSG - used for grading
    errormessage: "No results found!",
  });
}
