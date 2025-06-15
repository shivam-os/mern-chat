class ApiResponse {
  constructor(statusCode, message = "Success", data) {
    this.statusCode = statusCode;
    this.data = data || null;
    this.message = message;
    this.success = true;
  }
}

export { ApiResponse };
