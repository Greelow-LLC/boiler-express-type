import { Errors } from 'entities/Errors';
import { findAll } from 'services';

export const getAllErrors = async () => await findAll(Errors);
