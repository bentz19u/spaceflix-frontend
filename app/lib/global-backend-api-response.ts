export interface ErrorResponse {
  error: {
    code: string;
    description: string[];
    requestPath: string;
    requestId: string;
  };
}
