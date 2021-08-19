import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before handler....');

    const now = Date.now();

    //It is VITAL to call handler(), otherwise the handler will not be triggered
    return next
      .handle()
      .pipe(tap(() => console.log(`Call end after ${Date.now() - now}ms`)));
  }
}
