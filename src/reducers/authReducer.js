import { types } from '../types/types';

const initState = {};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...state,
        name: action.payload.name,
        uid: action.payload.uid,
      };

    case types.logout:
      return {};

    default:
      return state;
  }
};
