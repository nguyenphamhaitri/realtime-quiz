import mongoose, { Document, Schema } from 'mongoose';

interface IQuiz extends Document {
  title: string;
  description?: string;
}

const QuizSchema: Schema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
});

export default mongoose.model<IQuiz>('Quiz', QuizSchema);
