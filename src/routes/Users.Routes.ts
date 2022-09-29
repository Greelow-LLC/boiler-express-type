import {
  deleteUser,
  getUserById,
  getUsers,
  registerUser,
  updateUser,
} from 'controllers/Users.Controller';
import { Users } from 'entities/Users';
import { Router } from 'express';
import { validateId, validateSchema } from 'middlewares';
import { userSchema } from 'schemas';
import { safe } from 'utils/helpers';

export const router = Router();

router.get('/', safe(getUsers));

router.get('/:id', validateId(Users), safe(getUserById));

router.post('/', validateSchema(userSchema), safe(registerUser));

router.put(
  '/:id',
  validateId(Users),
  validateSchema(userSchema),
  safe(updateUser),
);

router.delete('/:id', validateId(Users), safe(deleteUser));

export default router;
