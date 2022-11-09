const storageStateCustomer = {
  userReducer: {
    email: 'zebirita@email.com',
    name: 'Cliente Zé Birita',
    role: 'customer',
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJpZCI6MywiaWF0IjoxNjY3OTM2MzYzLCJleHAiOjE2Njg1NDExNjN9.
    Zq-uQwCmzs45f0CUCXr0hUNu2Zc7CPDAD3we6GJ0yNc`,
    status: true,
  },
};

const storageStateSeller = {
  userReducer: {
    email: 'fulana@deliveryapp.com',
    name: 'Fulana Pereira',
    role: 'seller',
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJpZCI6MiwiaWF0IjoxNjY3OTM2MzEyLCJleHAiOjE2Njg1NDExMTJ9.
    1SQtBSdiED2Q9R43MuR4MCqQIT07xHTTh41su91n0_A`,
    status: true,
  },
};

const storageStateAdm = {
  userReducer: {
    email: 'adm@deliveryapp.com',
    name: 'Delivery App Admin',
    role: 'administrator',
    token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
    eyJpZCI6MSwiaWF0IjoxNjY3OTM2MTMyLCJleHAiOjE2Njg1NDA5MzJ9.
    B60xV4LduyVimJ_FvUq4599aa_s6fzQd7YfEwZivcV0`,
    status: true,
  },
};

const storageStateNotLogged = {
  userReducer: {
    email: '',
    name: '',
    role: '',
    token: '',
    status: false,
  },
};

export {
  storageStateCustomer,
  storageStateSeller,
  storageStateNotLogged,
  storageStateAdm,
};
