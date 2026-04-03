export type HttpError<J> = {
  status: number;
  message?: string;
  data?: J;
};

export function isHttpError<J>(error: unknown): error is HttpError<J> {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error &&
    'data' in error
  );
}
