import CustomButton from 'components/widgets/CustomButton';
import CustomInput from 'components/widgets/CustomInput';
import { useState } from 'react';

export default function InputQuiz() {
  const [name, setName] = useState('');

  return (
    <form>
      <CustomInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter quiz"
        className="stretched-text"
        p="1rem"
        w="25rem"
      />
      <CustomButton
        m="auto"
        mt="1rem"
        type="submit"
        bgColor="white"
        color="#003357"
        fontWeight="bold"
        fontSize="1rem"
        _hover={{
          bgColor: '#ccc',
        }}
      >
        Join!
      </CustomButton>
    </form>
  );
}
