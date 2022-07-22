export class CError extends Error {
  // stack: string | undefined;
  status: number;

  constructor(_message: string, code: number) {
    super(_message);
    this.status = code;
    Error.captureStackTrace(this);
  }
}
