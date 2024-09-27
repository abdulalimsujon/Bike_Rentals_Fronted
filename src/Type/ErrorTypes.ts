export type ErrorTypes = {
  data: {
    status: number;
    errorSources: {
      path: string;
      message: string;
    }[];
    message: string;
    success: boolean;
  };
};

export interface TErrorResponse {
  data: {
    errorSources: { path: string; message: string }[];
  };
}