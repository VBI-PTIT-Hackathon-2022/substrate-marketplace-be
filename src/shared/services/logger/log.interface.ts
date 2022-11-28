import { HttpException } from '@nestjs/common';

export interface ILog {
  method: string;
  endpoint: string;
  ipAddress: string | string[];
  message?: string;
  data?: Record<string, unknown>;
  error?: HttpException;
}
