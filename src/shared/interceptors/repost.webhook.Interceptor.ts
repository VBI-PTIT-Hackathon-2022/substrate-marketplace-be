import { HttpService } from '@nestjs/axios';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  mixin,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { from, lastValueFrom, Observable, tap } from 'rxjs';

export function RepostWebhookInterceptor(hookName: string): any {
  class RepostWebhookMixin implements NestInterceptor {
    constructor(
      private readonly httpService: HttpService,
      @Inject(ConfigService) private readonly configService: ConfigService,
    ) {}

    intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
      const body = context.switchToHttp().getRequest().body;

      const isEnabled = this.configService.get('SHOULD_REPOST_WEBHOOKS', {
        infer: true,
      });// biến env
      const urls = JSON.parse(
        this.configService.get('WEBHOOK_REPOST_URLS', { infer: true }),// biến env
      );

      if (isEnabled) {
        return next.handle().pipe(
          tap(() =>
            from(urls).forEach(
              (url) =>
                lastValueFrom(this.httpService.post(url + hookName, body)),
              // you can add authorization here, if needed
            ),
          ),
        );
      }

      return next.handle();
    }
  }

  return mixin(RepostWebhookMixin);
}
