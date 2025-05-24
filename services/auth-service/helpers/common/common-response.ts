import {
  TCustomErrorCode,
  TErrorCode,
  TStatusCode,
} from '../constants/status-codes';

export interface ResponseMetadata {
  page?: number;
  limit?: number;
  totalPages?: number;
  totalRecords?: number;
  search?: string;
}

export interface IApiResponse<T> {
  code: TStatusCode | TCustomErrorCode;
  statusCode: TStatusCode | TErrorCode;
  message: string;
  data?: T | null;
  metadata?: ResponseMetadata;
}

const customResponse = <T>(
  code: TStatusCode | TCustomErrorCode | TErrorCode,
  statusCode: TStatusCode | TErrorCode,
  message: string,
  data?: T | null,
  metadata?: ResponseMetadata
): IApiResponse<T> => ({
  code,
  statusCode,
  message,
  data,
  metadata,
});

export default customResponse;
