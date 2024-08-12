import { HStack, StackProps, Text, VStack } from '@chakra-ui/react';
import { User } from 'models/user';
import React, { useMemo } from 'react';

export interface ScoreBarProps extends StackProps {
  scoreBoard: { [username: string]: number };
}

const ScoreBar: React.FC<ScoreBarProps> = ({ scoreBoard, ...rest }) => {
  const userElements = useMemo(() => {
    return Object.keys(scoreBoard).map((username, index) => (
      <HStack key={index} justifyContent="space-between" w="100%">
        <Text>{username}</Text>
        <Text>{scoreBoard[username]}</Text>
      </HStack>
    ));
  }, [scoreBoard]);

  return (
    <VStack alignItems="flex-start" px="1rem" overflow="auto" {...rest}>
      {userElements}
    </VStack>
  );
};

export default ScoreBar;
