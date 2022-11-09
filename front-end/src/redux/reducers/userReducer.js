import lS from 'manager-local-storage';

const initialState = lS.get('user')
  ? {
    ...lS.get('user'),
    status: true,
  }
  : {
    email: '',
    name: '',
    role: '',
    token: '',
    status: false,
  };

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
      ...initialState,
    };
  default:
    return state;
  }
};

export default userReducer;
