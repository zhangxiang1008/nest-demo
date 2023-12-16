export interface ResultDTO<T> {
  success: boolean;
  message: string;
  data: T;
}
