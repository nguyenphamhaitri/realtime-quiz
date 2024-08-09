import { QuizController, SchemaCreateQuiz } from 'controllers/quiz';
import { Router } from 'express';
import asyncHandler from 'middlewares/asyncHandler';
import { validationResultMiddleware } from 'middlewares/validate';

const router = Router();

router.post(
  '/',
  SchemaCreateQuiz,
  validationResultMiddleware,
  asyncHandler(QuizController.createQuizSession),
);

export default router;
