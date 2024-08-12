import bcrypt from 'bcryptjs';
import User from 'models/user';
import { PS } from './constants';
import Question from 'models/question';

export const seedAdmin = async () => {
  try {
    if (!(await User.findOne({ username: 'admin' }))) {
      // Insert admin data
      const hashedPassword = await bcrypt.hash('123456', PS);
      const user = new User({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
      });
      await user.save();
      console.log('Admin seeded successfully');
    }

    if ((await Question.find()).length === 0) {
      // Insert questions
      const questions = [
        {
          text: 'it was the longest film i’ve ever seen; it ______ four hours.',
          options: ['ended', 'finished', 'lasted', 'stayed'],
          answer: 'lasted',
        },
        {
          text: 'the house was burgled while the family was ________ in a card game.',
          options: ['buried', 'busy', 'absorbed', 'helping'],
          answer: 'absorbed',
        },
        {
          text: '________ what he says, he wasn’t even there when the crime was committed.',
          options: ['following', 'according to', 'hearing', 'meaning'],
          answer: 'according to',
        },
        {
          text: 'i am sorry that i can’t ________ your invitation.',
          options: ['take', 'except', 'agree', 'accept'],
          answer: 'accept',
        },
        {
          text: 'very few scientists ________ with completely new answers to the world’s problems.',
          options: ['come to', 'come round to', 'come up', 'come in'],
          answer: 'come up',
        },
        {
          text: 'the presently accepted theory of light ________ some of the ideas of both earlier theories.',
          options: ['designs', 'composes', 'reacts', 'combines'],
          answer: 'combines',
        },
        {
          text: 'he always wore a shirt with an open ________ .',
          options: ['colour', 'tie', 'collar', 'tail'],
          answer: 'collar',
        },
        {
          text: 'as the fat man sat down, the deck chair ________ under him, with a loud noise of tearing canvas.',
          options: ['fell', 'fainted', 'sank', 'collapsed'],
          answer: 'collapsed',
        },
        {
          text: 'he took a ________ with him to clean the windscreen of his car.',
          options: ['garment', 'cloth', 'clothing', 'towel'],
          answer: 'cloth',
        },
        {
          text: 'these trees cannot be grown in such a cold ________ as ours.',
          options: ['weather', 'climate', 'season', 'space'],
          answer: 'climate',
        },
        {
          text: 'he wrote his name ________ and carefully at the top of the paper.',
          options: ['largely', 'attentively', 'obviously', 'clearly'],
          answer: 'clearly',
        },
        {
          text: 'the sky looks lighter. i think the weather is ________ .',
          options: ['clearing away', 'clearing', 'bettering', 'clearing up'],
          answer: 'clearing up',
        },
        {
          text: 'the teacher ________ the harder parts of the story.',
          options: ['cleared away', 'cleared out', 'cleared up', 'cleared off'],
          answer: 'cleared up',
        },
      ];
      await Question.insertMany(questions);
      console.log('Questions seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
