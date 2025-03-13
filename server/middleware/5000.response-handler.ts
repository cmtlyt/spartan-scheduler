import type { Operation } from '~/types/operation';

interface Metadata {
  i18nKey?: string;
  operation?: Operation;
}

interface BaseResponse {
  code: number;
  metadata: Metadata;
  timestamp: number;
  success: boolean;
}

interface SuccessResponse<T> extends BaseResponse {
  success: true;
  data: T;
}

interface FailResponse extends BaseResponse {
  success: false;
  message: string;
}

declare module 'h3' {
  interface H3EventContext {
    success: <T>(data: T, metadata?: Metadata) => SuccessResponse<T>;
    fail: (message: string, metadata?: Metadata) => FailResponse;
  }
}

export default defineEventHandler(async (event) => {
  event.context.success = (data, metadata = {}) => {
    return {
      data,
      metadata,
      code: 0,
      success: true,
      timestamp: Date.now(),
    };
  };
  event.context.fail = (message, metadata = {}) => {
    return {
      message,
      metadata,
      code: 1,
      success: false,
      timestamp: Date.now(),
    };
  };
});
