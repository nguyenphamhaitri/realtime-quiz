import { StackProps, Text, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';

export interface ParticipantBarProps extends StackProps {
  users: string[];
}

const ParticipantBar: React.FC<ParticipantBarProps> = ({ users, ...rest }) => {
  const userElements = useMemo(() => {
    return users.map((username, index) => <Text key={index}>{username}</Text>);
  }, [users]);

  return (
    <VStack alignItems="flex-start" px="1rem" overflow="auto" {...rest}>
      {userElements}
    </VStack>
  );
};

export default ParticipantBar;
