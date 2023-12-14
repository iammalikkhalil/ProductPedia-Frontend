import {fork} from 'redux-saga/effects';
import {watchCategories, watchCompanies, watchCountries, watchProducts} from './SagaWrapper';

function* Saga() {
  // Fork sagas to run concurrently
  console.log("requestion saga for api's data");
  yield fork(watchProducts);
  yield fork(watchCategories);
  yield fork(watchCompanies);
  yield fork(watchCountries);
}

export default Saga;
