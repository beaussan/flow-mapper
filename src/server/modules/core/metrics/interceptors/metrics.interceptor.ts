import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Counter, Histogram } from 'prom-client';
import { InjectHistogramMetric } from '../common/prom.decorators';
import * as UrlValueParser from 'url-value-parser';
import { parse } from 'url';

@Injectable()
export class MetricsInterceptor implements NestInterceptor<any, any> {
  parser: any;

  constructor(
    @InjectHistogramMetric('http_request_duration_seconds')
    private readonly httpRequests: Histogram,
  ) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const path = req.originalUrl || req.url;

    if (path.match(/\/metrics(\?.*?)?$/)) {
      return call$;
    }

    const labels: any = {};
    const timer = this.httpRequests.startTimer(labels);

    return call$.pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        labels.method = req.method;
        labels.status_code = this.getStatusCode(res);
        labels.path = this.getPath(req);
        timer();
      }),
    );
  }

  getStatusCode(res: any): number {
    return res.status_code || res.statusCode;
  }

  getPath(req: any): string {
    const path = parse(req.originalUrl || req.url).pathname;

    if (!this.parser) {
      this.parser = new UrlValueParser();
    }

    return this.parser.replacePathValues(path);
  }
}
