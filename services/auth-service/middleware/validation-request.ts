import { ObjectSchema } from 'joi';

import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ParsedQs } from 'qs';
import { ParamsDictionary } from 'express-serve-static-core';
import {
  ERROR_CODES,
  CUSTOM_ERROR_CODES,
} from '../helpers/constants/status-codes';
import customResponse from '../helpers/common/common-response';
import COMMON_MESSAGES from '../helpers/constants/messages/common-messages.json';

interface IValidate {
  <T>(
    schema: ObjectSchema<T>,
    data: T | ParsedQs | ParamsDictionary,
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}

interface IValidateRequestPart {
  <T>(schema: ObjectSchema<T>): RequestHandler;
}

const validateRequest = (() => {
  const validate: IValidate = async (schema, data, req, res, next) => {
    const parsedBody = await schema.validate(data);
    if (parsedBody.error) {
      res
        .status(ERROR_CODES.BAD_REQUEST)
        .json(
          customResponse(
            CUSTOM_ERROR_CODES.BAD_REQUEST,
            ERROR_CODES.BAD_REQUEST,
            parsedBody.error.message || COMMON_MESSAGES.INTERNAL_SERVER_ERROR
          )
        );
      return;
    }
    next();
  };

  const body: IValidateRequestPart =
    (schema) => async (req: Request, res: Response, next: NextFunction) => {
      await validate(schema, req.body, req, res, next);
    };

  const params: IValidateRequestPart =
    (schema) => async (req: Request, res: Response, next: NextFunction) => {
      await validate(schema, req.params, req, res, next);
    };

  const query: IValidateRequestPart =
    (schema) => async (req: Request, res: Response, next: NextFunction) => {
      await validate(schema, req.query, req, res, next);
    };

  return { body, params, query };
})();

export default validateRequest;
