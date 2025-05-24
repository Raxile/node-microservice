import customResponse from '../common/common-response';
import { ERROR_CODES, CUSTOM_ERROR_CODES } from '../constants/status-codes';
import COMMON_MESSAGES from '../constants/messages/common-messages.json';
import { Request, Response, NextFunction, RequestHandler } from 'express';

const asyncHandler =
  (func: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      func(req, res, next);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error, error);
      res
        .status(ERROR_CODES.INTERNAL_SERVER_ERROR)
        .json(
          customResponse(
            CUSTOM_ERROR_CODES.INTERNAL_SERVER_ERROR,
            ERROR_CODES.INTERNAL_SERVER_ERROR,
            COMMON_MESSAGES.INTERNAL_SERVER_ERROR
          )
        );
    }
  };

export default asyncHandler;
