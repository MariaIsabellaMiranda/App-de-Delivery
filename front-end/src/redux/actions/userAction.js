import lS from 'manager-local-storage';
import { LOGIN, LOGOUT } from '../reducers/userReducer';

export const loginUser = (payload) => {
  lS.set('user', payload);
  return { type: LOGIN, payload };
};

export const logoutUser = () => ({ type: LOGOUT });
