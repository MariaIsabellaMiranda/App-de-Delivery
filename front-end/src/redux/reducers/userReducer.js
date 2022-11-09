import lS from 'manager-local-storage';

const emptyState = {
  email: '',
  name: '',
  role: '',
  token: '',
  status: false,
};

const initialState = lS.get('user')
  ? {
    ...lS.get('user'),
    status: true,
  }
  : emptyState;

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      ...action.payload,
      status: true,
    };
  case LOGOUT:
    return {
      ...state,
      ...emptyState,
    };
  default:
    return state;
  }
};

export default userReducer;
