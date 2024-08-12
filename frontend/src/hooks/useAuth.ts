import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store';
import { logout } from 'store/slices/userSlice';

export default function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const isLoggedIn = useMemo(() => !!currentUser, [currentUser]);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return {
    currentUser,
    isLoggedIn,
    handleLogout,
  };
}
