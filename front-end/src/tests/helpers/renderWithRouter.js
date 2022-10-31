import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
// import { Provider } from 'react-redux';
// import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../../redux/reducers';

export const renderWithRouter = (component) => {
  // const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  const history = createMemoryHistory();

  return {
    ...render(
      // <Provider store={ store }>
      <Router history={ history }>
        {component}
      </Router>,
      // </Provider>,
    ),
    history,
    // store,
  };
};

export default renderWithRouter;
