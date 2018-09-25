import { MiddlewareFunction, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';
// import { authUserSchema } from '../../user/joi/auth-user.joi';
import { validateSync } from '../../validation/validation.util';

export const bodyValidatorMiddleware: MiddlewareFunction = async (
  req: Request,
  res: Response,
  next: () => void,
) => {
  // const result = validateSync(req.body, authUserSchema);
  /*
    if (result.error) {
      const errorMessage = result.error.details.shift().message;
      const message: string = errorMessage.replace(/["]/g, '');

      return next(new BadRequestException(`Validation failed: ${message}`));
    }
    */

  next();
};
