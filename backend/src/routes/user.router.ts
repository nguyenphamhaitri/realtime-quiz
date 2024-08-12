import {
  UserController,
  SchemaLogin,
  SchemaRegister,
  SchemaGenerateGuestId,
} from 'controllers/user';
import { Router } from 'express';
import asyncHandler from 'middlewares/asyncHandler';
import { validationResultMiddleware } from 'middlewares/validate';

const router = Router();

router.post(
  '/register',
  SchemaRegister,
  validationResultMiddleware,
  asyncHandler(UserController.register),
);
router.post(
  '/login',
  SchemaLogin,
  validationResultMiddleware,
  asyncHandler(UserController.login),
);

router.post(
  '/generate-guest-id',
  SchemaGenerateGuestId,
  validationResultMiddleware,
  asyncHandler(UserController.generateGuestId),
);

export default router;
