import fs from 'fs';

import { Router } from 'express';
import { importDynamicRoute, lowerCaseFirstLetter } from 'utils/helpers';

const router = Router();
const THIS_PATH = __dirname;

// use express router with dynamic import
const useRoute = async (prefix: string, importPath: string) =>
  router.use(`/api/v1/${prefix}`, await importDynamicRoute(importPath));

const getRoutePrefix = (routeName: string): string =>
  routeName.split('.').shift() || '';

//maps all routes
fs.readdirSync(THIS_PATH).map(async fileName => {
  const routePrefix = lowerCaseFirstLetter(getRoutePrefix(fileName));
  const importPath = `${THIS_PATH}/${getRoutePrefix(fileName)}.Routes`;

  if (routePrefix !== 'index') useRoute(routePrefix, importPath);
});

export default router;
