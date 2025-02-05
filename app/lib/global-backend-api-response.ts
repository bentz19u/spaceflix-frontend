export interface ErrorResponseDto {
  error: {
    code: string;
    description: string[];
    requestPath: string;
    requestId: string;
  };
}
