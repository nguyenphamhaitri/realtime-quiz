import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { logout } from 'store/slices/userSlice';

export default function useAuth() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const isLoggedIn = useMemo(() => !!currentUser, [currentUser]);
  const handleLogout = () => {
    dispatch(logout());
  };
  return {
    currentUser,
    isLoggedIn,
    handleLogout,
  };
}
