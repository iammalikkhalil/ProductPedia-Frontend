import { ADD_COMPANIES, GET_COMPANIES } from '../constants/Constants';

const initialState = [];

export const CompanyReducers = (state = initialState, { type, data }) => {
  switch (type) {
    case GET_COMPANIES:
      if (data == undefined) {
        return state
      } else {
        console.log("companies data getted sucessfull");
        return data
      }
    case ADD_COMPANIES:
      state = [...state, data]
        return state;
    default:
      return state;
  }
};