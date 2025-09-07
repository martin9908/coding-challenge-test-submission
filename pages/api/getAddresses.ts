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

  const isStrictlyNumeric = (value: string) => /^\d+$/.test(value.trim());

  const validateDigits = (label: "Postcode" | "Street Number", value: string) => {
    if (!isStrictlyNumeric(value)) {
      return `${label} must be all digits and non negative!`;
    }
    return null;
  };

  const postCodeErr = validateDigits("Postcode", String(postcode));
  if (postCodeErr) {
    return res.status(400).send({ status: "error", errormessage: postCodeErr });
  }

  const streetNumberErr = validateDigits("Street Number", String(streetnumber));
  if (streetNumberErr) {
    return res.status(400).send({ status: "error", errormessage: streetNumberErr });
  }

  const mockAddresses = generateMockAddresses(
    postcode as string,
    streetnumber as string
  );

  if (mockAddresses) {
    const timeout = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await timeout(500);
    return res.status(200).json({ status: "ok", details: mockAddresses });
  }

  return res.status(404).json({
    status: "error",
    // DO NOT MODIFY MSG - used for grading
    errormessage: "No results found!",
  });
}
