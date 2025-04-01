class ApiError extends Error {
  statusCode: number;
  success: boolean;
  data: any;
  error: any;

  constructor(statusCode: number = 500, message: string = "Something went wrong", error:any = null) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.data = null;
    this.error = error;

    // Ensure the stack is captured only in development mode
    if (process.env.NODE_ENV !== "production") {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      success: this.success,
      message: this.message, // Explicitly include message
      data: this.data,
      error: this.error,
    };
  }
}

export default ApiError;
