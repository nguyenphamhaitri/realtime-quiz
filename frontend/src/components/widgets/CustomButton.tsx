import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface CustomButtonProps extends ButtonProps {}

const CustomButton: React.FC<CustomButtonProps> = ({ ...props }) => {
  return (
    <Button
      h="2.5rem"
      borderRadius="5px"
      display="flex"
      alignItems="center"
      p="0.5rem 1.1rem"
      border="none"
      bg="#003357"
      color="#DFDEDF"
      userSelect="none"
      boxShadow="0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12)"
      _focus={{
        boxShadow:
          'inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5)',
        outline: 0,
      }}
      _hover={{
        bg: '#00245b',
      }}
      cursor="pointer"
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
