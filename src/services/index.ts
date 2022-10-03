/* eslint-disable */
import { AppDataSource } from 'ormconfig';
import { FindManyOptions, FindOneOptions } from 'typeorm';

export const findAll = async (
  entity: Function, 
  findOptions: FindManyOptions = {},
) => await AppDataSource.manager.find(entity, findOptions);

export const findOne = async (
  entity: Function,
  findOptions: FindOneOptions = {},
) => await AppDataSource.manager.findOne(entity, findOptions);

export const updateOne = async (
  entity: Function,
  rowToUpdate = {},
  updateData = {},
) => {
  AppDataSource.manager.merge(entity, rowToUpdate, updateData);
  return await AppDataSource.manager.save(entity, rowToUpdate);
};

export const createOne = async (entity: Function, newData = {}) =>
  await AppDataSource.manager.save(entity, newData);

  export const deleteOne = async (entity: Function, rowToDelete = {}) =>
  await AppDataSource.manager.softRemove(entity, rowToDelete);
  
  /* eslint-enable */
