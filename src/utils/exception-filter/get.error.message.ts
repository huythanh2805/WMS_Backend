import { HttpException } from "@nestjs/common";

 export default function getErrorMessage(exception: unknown): string {
  if (exception instanceof HttpException) {
    const res = exception.getResponse();
    if (typeof res === 'string') return res;

    if (typeof res === 'object' && res !== null) {
      const message = (res as any).message;
      return Array.isArray(message)
        ? message.join(', ')
        : message;
    }
  }
  return 'Internal server error';
};