export type HttpError<J> = {
  status: number;
  message?: string;
  data?: J;
};
