export interface ErrorResponse {
  type: string;
  title: string;
  status: number;
  traceId: string;
  errors: {
    [k: string]: string[];
  }
}
