import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CommonLogger } from '../services/logger/common-logger';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const logger = new CommonLogger('RESPONSE');
    const request: Request = context.switchToHttp().getRequest();
    const now = Date.now();
    return next
      .handle()
      .pipe(map((data) => ({ data })))
      .pipe(
        tap((data) =>
          logger.customInfo(
            request?.method !== 'GET'
              ? `URL: ${request?.url} ${JSON.stringify(data)} ${
                  Date.now() - now
                }ms`
              : `URL: ${request?.url} ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
