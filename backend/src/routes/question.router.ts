import { QuestionController } from 'controllers/question/question.controller';
import { SchemaCreateQuestion } from 'controllers/question/question.validation';
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
