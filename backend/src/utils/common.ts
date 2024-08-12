export function generateQuizId() {
  return `${generate4CharString()}-${generate4CharString()}-${generate4CharString()}-${generate4CharString()}`;
}

export function generate4CharString() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}
