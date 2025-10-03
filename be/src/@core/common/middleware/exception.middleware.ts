import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

@Catch(HttpException)
export class ExceptionMiddleware implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorInstanceStatus =
      exception.getStatus() ?? HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(errorInstanceStatus).json({
      statusCode: errorInstanceStatus,
      status_description: exception.getResponse()['message'],
      error_detail: exception.getResponse()['error_detail'] ?? null,
    });
  }
}
