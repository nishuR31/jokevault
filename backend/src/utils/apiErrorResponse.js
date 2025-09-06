import codes from "./statusCodes.js";

export default class ApiErrorResponse extends Error {
  constructor(
    message = "Some error occured when fetching api",
    code = codes.badRequest,
    payload = { message: "No payload passed" },
    err = null
  ) {
    super(err?.message || message);
    this.name = this.constructor.name;
    this.payload = payload;
    this.code = code;
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, this.constructor);
  }

  res() {
    return {
      message: this.message,
      name: this.name,
      payload: this.payload,
      code: this.code,
      ...(!!parseInt(process.env.DEV) && { stack: this.stack }),
    };
  }
}
