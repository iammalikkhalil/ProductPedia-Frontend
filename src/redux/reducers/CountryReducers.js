import { ADD_COUNTRIES, GET_COUNTRIES } from '../constants/Constants';

const initialState = [];

export const CountryReducers = (state = initialState, { type, data }) => {
  switch (type) {
    case GET_COUNTRIES:
      if (data == undefined) {
        return state
      } else {
        console.log("countries data getted sucessfull");
        return data
      }
    case ADD_COUNTRIES:
        state = [...state, data]
          return state;
    default:
      return state;
  }
};