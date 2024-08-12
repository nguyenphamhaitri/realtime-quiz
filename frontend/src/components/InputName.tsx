import { UserApi } from 'apis/userApi';
import CustomButton from 'components/widgets/CustomButton';
import CustomInput from 'components/widgets/CustomInput';
import { useDispatch } from 'hooks';
import { useState } from 'react';
import { setCurrentUser } from 'store/slices/userSlice';

export default function InputName() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const guestId = await UserApi.generateGuestId(name);
    const username = `${name} #${guestId}`;
    setName(username);
    dispatch(setCurrentUser({ username }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Join as a guest"
        className="stretched-text"
        p="1rem"
        w="20rem"
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
