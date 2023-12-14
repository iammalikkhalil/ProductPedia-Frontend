import { GET_PRODUCTS } from '../constants/Constants';

const initialState = [];

export const ProductReducers = (state = initialState, { type, data }) => {
  switch (type) {
    case GET_PRODUCTS:
      if (data == undefined) {
        return state
      } else {
        console.log("products data getted sucessfull");
        return data
      }

    default:
      return state;
  }
};