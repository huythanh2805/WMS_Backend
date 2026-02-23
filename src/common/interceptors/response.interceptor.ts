// common/interceptors/response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler) {
  return next.handle().pipe(
    map((response) => {
      if (response?.data !== undefined) {
        return {
          success: true,
          message: response.message || 'Success',
          data: response.data,
        };
      }

      return {
        success: true,
        message: 'Success',
        data: response,
      };
    }),
  );
}
}