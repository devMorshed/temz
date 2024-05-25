class ApiResponse {
  statusCode: number;
  data?: unknown;
  message: string;
  success: boolean;

  constructor({
    statusCode,
    message = "Executed Successfully",
    success = true,
    data,
  }: {
    statusCode: number;
    message?: string;
    success?: boolean;
    data?: null | unknown;
  }) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
    this.data = data;
  }
}

export default ApiResponse;
