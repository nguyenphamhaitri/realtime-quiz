import mongoose, { Document, Schema } from 'mongoose';

export interface IQuestion extends Document {
  text: string;
  options: string[];
  answer: string;
}

const QuestionSchema: Schema = new Schema({
  text: {
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

export default mongoose.model<IQuestion>('Question', QuestionSchema);
