import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  FormErrorMessage,
} from '@chakra-ui/react';

interface CustomInputProps extends InputProps {
  label?: string;
  errorMessage?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  errorMessage,
  isInvalid,
  ...props
}) => {
  return (
    <FormControl isInvalid={isInvalid}>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        h="1rem"
        borderRadius="5px"
        border="1px solid #ccc"
        boxShadow="none"
        p="0.5rem"
        _placeholder={{ color: '#ccc' }}
        _focus={{
          borderColor: 'blue.500',
          boxShadow: 'outline',
          outline: 'none',
        }}
        {...props}
      />
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};

export default CustomInput;
