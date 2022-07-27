import { log } from 'console';
import { Request, Response } from 'express';
import { Errors } from '../entities/Errors';
import { AppDataSource } from '../ormconfig';
import { customError } from '../utils/helpers';

const errorsRepo = AppDataSource.getRepository(Errors);

export const getErrors = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const errors = await errorsRepo.find();

    return res.json(errors);
  } catch (error: any) {
    return res.status(error?.status || 400).json({
      message: error?.message || error?.msg || error,
      code: error?.codeError || 0,
      descri: error?.descriError || '',
    });
  }
};

export const createError = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const newData = req.body;

    const errorExists = await errorsRepo.findOne({
      where: [{ descri: newData.descri }, { code: newData.code }],
    });
    if (errorExists) throw await customError('Error already exists', 1);

    const newError = await errorsRepo.save(newData);

    const error = await errorsRepo.findOneBy({ id: newError.id });

    return res.json(error);
  } catch (error: any) {
    return res.status(error?.status || 400).json({
      message: error?.message || error?.msg || error,
      code: error?.codeError || 0,
      descri: error?.descriError || '',
    });
  }
};

export const updateError = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const updateData = req.body;
    const errorToUpdate = res.locals.item;

    const errorExists = await errorsRepo.findOne({
      where: [{ descri: updateData.descri }, { code: updateData.code }],
    });

    if (errorExists && errorToUpdate.id !== errorExists.id)
      throw await customError('Error already exists', 1);

    errorsRepo.merge(errorToUpdate, updateData);
    await errorsRepo.save(errorToUpdate);

    const updatedError = await errorsRepo.findOneBy({ id: errorToUpdate.id });

    return res.json(updatedError);
  } catch (error: any) {
    return res.status(error?.status || 400).json({
      message: error?.message || error?.msg || error,
      code: error?.codeError || 0,
      descri: error?.descriError || '',
    });
  }
};

export const getErrorById = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const error = await errorsRepo.findOneBy({ id: res.locals.item.id });

    return res.json(error);
  } catch (error: any) {
    return res.status(error?.status || 400).json({
      message: error?.message || error?.msg || error,
      code: error?.codeError || 0,
      descri: error?.descriError || '',
    });
  }
};

export const deleteError = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const error = res.locals.item;
    const result = await errorsRepo.softRemove(error);

    return res.json(result);
  } catch (error: any) {
    return res.status(error?.status || 400).json({
      message: error?.message || error?.msg || error,
      code: error?.codeError || 0,
      descri: error?.descriError || '',
    });
  }
};
