import * as yup from "yup";

export function getRequiredTextSchema(min = 3, max = 50) {
  return yup
    .string()
    .required("This field is required")
    .min(min, `Minimum number of characters is ${min}`)
    .max(max, `Minimum number of characters is ${max}`);
}

export const storageKeys = {
  token: "authTOKEN",
};
