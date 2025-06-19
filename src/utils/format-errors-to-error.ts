export const formatErrorsToError = (errors: [] | string) => {
  if (Array.isArray(errors) && errors.length > 0) {
    return errors.join(", ");
  } else if (typeof errors === "string") {
    return errors;
  } else {
    return "An unknown error occurred";
  }
};
