import { Flex, FlexProps } from '@chakra-ui/react';
import CustomButton from 'components/widgets/CustomButton';
import CustomInput from 'components/widgets/CustomInput';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputQuiz: React.FC<FlexProps> = (props) => {
  const navigate = useNavigate();
  const [quizId, setQuizId] = useState('');

  const handleJoinQuiz = () => {
    if (!!quizId) {
      navigate(`/quiz/${quizId}`);
    }
  };

  return (
    <form>
      <Flex
        direction="column"
        alignItems="center"
        {...props}
        justifyContent="center"
      >
        <CustomInput
          value={quizId}
          onChange={(e) => setQuizId(e.target.value)}
          placeholder="Enter quiz id"
          className="stretched-text"
          p="1rem"
        />
        <CustomButton
          mt="1rem"
          type="submit"
          bgColor="white"
          color="#003357"
          fontWeight="bold"
          fontSize="1rem"
          _hover={{
            bgColor: '#ccc',
          }}
          w="4rem"
          onClick={handleJoinQuiz}
        >
          Join!
        </CustomButton>
      </Flex>
    </form>
  );
};
export default InputQuiz;
