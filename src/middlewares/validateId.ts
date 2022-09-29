import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from 'ormconfig';
import { customError } from 'utils/helpers';

export const validateId =
  (entity: any) => async (req: Request, res: Response, next: NextFunction) => {
    const entityName = entity.name;

    try {
      const item = await AppDataSource.manager.findOne(entity, {
        where: { id: +req.params.id },
      });
      if (!item)
        throw await customError(
          `${entityName.substring(0, entityName.length - 1)} not found`,
          2,
        );

      res.locals.item = item;
      next();
    } catch (error: any) {
      return res.status(error?.status || 400).json({
        message: error?.message || error?.msg || error,
        code: error?.codeError || 0,
        descri: error?.descriError || '',
      });
    }
  };
