// common/filters/http-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import getErrorMessage from 'src/utils/exception-filter/get.error.message';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.error('Exception caught by filter:', exception);
    response.status(status).json({
      success: false,
      statusCode: status,
      message: getErrorMessage(exception),
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}