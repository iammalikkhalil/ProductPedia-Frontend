import {ADD_CATEGORIES, ADD_COMPANIES, ADD_COUNTRIES, GET_CATEGORIES, GET_COMPANIES, GET_COUNTRIES, GET_PRODUCTS, MODEL_DATA, PARAMS_DATA, TOGGLE_MODEL_VISIBLILITY} from '../constants/Constants';

export const GetCategories= () => {
  return {type: GET_CATEGORIES};
};

export const GetProducts= () => {
  return {type: GET_PRODUCTS};
};

export const GetCompanies= () => {
  return {type: GET_COMPANIES};
};

export const AddCompanies = payload => {
  return {type: ADD_COMPANIES, data: payload};
};


export const AddCategories = payload => {
  return {type: ADD_CATEGORIES, data: payload};
};


export const AddCountries = payload => {
  return {type: ADD_COUNTRIES, data: payload};
};


export const GetCountries= () => {
  return {type: GET_COUNTRIES};
};

export const TogleModelVisibility = payload => {
  return {type: TOGGLE_MODEL_VISIBLILITY, data: payload};
};

export const ParamsData = payload => {
  return {type: PARAMS_DATA, data: payload};
};

export const ModelData = payload => {
  return {type: MODEL_DATA, data: payload};
};