// common/interceptors/response.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common"
import { map } from "rxjs/operators"
import { Reflector } from "@nestjs/core"

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    // Check if the controller or method has the "allowRefreshToken" metadata (decorator)
    const allowRefreshToken = this.reflector.getAllAndOverride<boolean>(
      "allowRefreshToken",
      [
        context.getHandler(), // method
        context.getClass(), // controller
      ],
    )
    return next.handle().pipe(
      map((response) => {
        // Case 1: If the response has a 'data' and "message" property, we assume it's already in the correct format
        if (response?.data !== undefined) {
          // If the response contains a fiels that we want to exclude it from the data and return it separately
          const { refreshToken, password, ...rest } = response.data
          return {
            success: true,
            message: response.message || "Success",
            data: allowRefreshToken ? { ...rest, refreshToken } : rest,
          }
        }
        // Case 2:
        // If the response contains a fiels that we want to exclude it from the data and return it separately
        const { refreshToken, password, ...rest } = response
        return {
          success: true,
          message: "Success",
          data: allowRefreshToken ? { ...rest, refreshToken } : rest,
        }
      }),
    )
  }
}
