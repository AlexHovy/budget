export interface LogEventDto {
  category: string;
  action: string;
  label?: string;
  event?: number;
  page?: string;
}

export interface LogErrorDto {
  message: string;
  fatal: boolean;
}
