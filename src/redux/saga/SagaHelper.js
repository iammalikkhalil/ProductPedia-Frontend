import {call, put} from 'redux-saga/effects';

async function ApiCall(params) {
  try {
    const response = await fetch(params);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export function* SagaHelper(params) {
  try {
    const data = yield call(ApiCall, params.url);
    yield put({type: params.type, data: data});
  } catch (error) {
    console.error('Error in SagaHelper Function:', error);
  }
}
