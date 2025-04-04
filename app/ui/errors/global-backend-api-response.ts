interface DescriptionDTO {
  target: object;
  value: object;
  property: string;
  children: [];
  constraints: Record<string, string>;
}

export interface ErrorResponseDTO {
  error: {
    code: string;
    description: [DescriptionDTO];
    requestPath: string;
    requestId: string;
  };
}

export enum ErrorEnum {
  ERROR = 'error',
  ERRORS = 'errors',
}
