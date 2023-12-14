import { ADD_CATEGORIES, GET_CATEGORIES } from '../constants/Constants';

const initialState = [];

export const CategoryReducers = (state = initialState, { type, data }) => {
  switch (type) {
    case GET_CATEGORIES:
      if (data == undefined) {
        return state
      } else {
        console.log("categories data getted sucessfull");
        return data
      }
      case ADD_CATEGORIES:
      state = [...state, data]
        return state;

    default:
      return state;
  }
};