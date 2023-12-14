import {take, fork} from 'redux-saga/effects';
import {GET_CATEGORIES, GET_COMPANIES, GET_COUNTRIES, GET_PRODUCTS} from '../constants/Constants';
import {SagaHelper} from './SagaHelper';
import {getProductsApi, getCategoriesApi, getCompaniesApi, getCountriesApi} from '../constants/Apis';

export function* watchProducts() {
  //for products
  yield take(GET_PRODUCTS);
  yield fork(SagaHelper, {url: getProductsApi, type: GET_PRODUCTS});
}

export function* watchCategories() {
  //for categories
  yield take(GET_CATEGORIES);
  yield fork(SagaHelper, {url: getCategoriesApi, type: GET_CATEGORIES});
}

export function* watchCompanies() {
  //for categories
  yield take(GET_COMPANIES);
  yield fork(SagaHelper, {url: getCompaniesApi, type: GET_COMPANIES});
}

export function* watchCountries() {
  //for countries
  yield take(GET_COUNTRIES);
  yield fork(SagaHelper, {url: getCountriesApi, type: GET_COUNTRIES});
}



