import mongoose, { Document, Schema } from 'mongoose';

interface IQuestion extends Document {
  quizId: mongoose.Schema.Types.ObjectId;
  questionText: string;
  options: string[];
  answer: string;
}

const QuestionSchema: Schema = new Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    require: true,
  },
});

export default mongoose.model<IQuestion>('Quiz', QuestionSchema);
