import { MODEL_DATA } from '../constants/Constants';

const initialState = {};

export const ModelReducers = (
  state = initialState,
  {type, data},
) => {
  switch (type) {
    case MODEL_DATA:
      return data;
    default:
      return state;
  }
};
