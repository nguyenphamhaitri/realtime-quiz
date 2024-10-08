import { SchemaCreateQuestion, QuestionController } from 'controllers/question';
import { Router } from 'express';
import asyncHandler from 'middlewares/asyncHandler';
import { validationResultMiddleware } from 'middlewares/validate';

const router = Router();

router.post(
  '/',
  SchemaCreateQuestion,
  validationResultMiddleware,
  asyncHandler(QuestionController.CreateQuestion),
);

router.get('/random', asyncHandler(QuestionController.GetRandomQuestions));

export default router;
