import * as bcrypt from 'bcrypt';

export const generateBcryptHash = async (plainText: string) => {
  const saltRounds = 10; // You can adjust the cost factor (salt rounds) as needed
  try {
    return await bcrypt.hash(plainText, saltRounds);
  } catch (error) {
    console.error('Error generating hash:', error);
  }
};
