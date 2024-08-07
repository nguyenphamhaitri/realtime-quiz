import bcrypt from 'bcryptjs';
import User from 'models/user';
import { PS } from './constants';

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
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};
