import { Box, BoxProps } from '@chakra-ui/react';
import { QuizApi } from 'apis/quizApi';
import CustomButton from 'components/widgets/CustomButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store';

const CreateQuiz: React.FC<BoxProps> = (props) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const handleCreateQuiz = async () => {
    const quiz = await QuizApi.createQuiz(currentUser!.username);
    navigate(`/quiz/${quiz.quizId}`);
  };

  return (
    <Box {...props}>
      <CustomButton
        bgColor="#fff"
        color="#003357"
        fontSize="1.75rem"
        p="1.5rem"
        _hover={{
          bgColor: '#ccc',
        }}
        onClick={handleCreateQuiz}
      >
        Create Quiz!!!
      </CustomButton>
    </Box>
  );
};

export default CreateQuiz;
