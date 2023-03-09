import React, { createContext, useContext, useReducer } from 'react';
import { getStorageItem, setStorageItem } from 'utils/useLocalStorage';

const AppContext = createContext();

const reducer = (prevState, action) => {
  const { type } = action;
  if (type === SET_TOKEN) {
    const { payload: jwtToken } = action;
    return {
      ...prevState,
      jwtToken,
      isAuthenticated: true,
    };
  } else if (type === DELETE_TOKEN) {
    return {
      ...prevState,
      jwtToken: '',
      isAuthenticated: false,
    };
  }

  return prevState;
};

export const AppProvider = ({ children }) => {
  const jwtToken = getStorageItem('jwtToken', '');

  const [store, dispatch] = useReducer(reducer, {}, () => ({
    jwtToken,
    isAuthenticated: jwtToken.length > 0,
  }));

  const setToken = (token) => {
    dispatch({
      type: SET_TOKEN,
      payload: token,
    });
    setStorageItem('jwtToken', token);
  };

  const deleteToken = (token) => {
    dispatch({
      type: DELETE_TOKEN,
      payload: token,
    });
    setStorageItem('jwtToken', '');
  };

  return (
    <AppContext.Provider value={{ store, setToken, deleteToken }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

// actions
const SET_TOKEN = 'APP/SET_TOKEN';
const DELETE_TOKEN = 'APP/DELETE_TOKEN';
