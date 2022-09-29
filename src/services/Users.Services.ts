import { Users } from 'entities/Users';
import { createJwt } from 'utils/auth';
import { customError } from 'utils/helpers';

import { createOne, deleteOne, findAll, findOne, updateOne } from './';

export const getAllUsers = async () => await findAll(Users);

export const registerOneUser = async ({
  email,
  firstName,
  lastName,
  phone,
}: Users) => {
  const userExists = await findOne(Users, { where: { email } });
  if (userExists) throw await customError('User already exists', 1);

  const user = (await createOne(Users, {
    email,
    firstName,
    lastName,
    phone,
  })) as Users;
  const token = (await createJwt(user)) as string;

  return { user, token };
};

export const updateOneUser = async (userToUpdate: Users, updateData: Users) => {
  const userExists = await findOne(Users, {
    where: { email: updateData.email },
  });
  if (userExists && userToUpdate.id !== userExists.id)
    throw await customError('User already exists', 1);

  await updateOne(Users, userToUpdate, updateData);
  const updatedUser = await findOne(Users, { where: { id: userToUpdate.id } });
  const token = await createJwt(updateData);

  return { updatedUser, token };
};

export const getOneUser = async (user: Users) =>
  await findOne(Users, { where: { id: user.id } });

export const deleteOneUser = async (userToDelete: Users) =>
  await deleteOne(Users, userToDelete);
