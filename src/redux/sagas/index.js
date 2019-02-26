import { put as dispatch, call, takeEvery, all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import axios from '../../../node_modules/axios';




function* deleteSaga(action) {
   console.log('got to deleteSaga');
   try {
      yield call(axios.delete, `/api/locations/${action.payload.id}`, action.payload)
      yield dispatch({
         type: 'DELETE_LOCATION',
         payload: this.state.id
      })
   } catch (error) {
      console.log('error in deleteSaga:', error);
   }
}




function* editSaga(action) {
   try {
      
      // yield call(axios.get, `/api/locations/${action.payload}`)
      yield dispatch({
         type: 'SWITCH_LOCATION',
         payload: action.payload
      })
      yield dispatch({
         type: 'GET_DISPLAY_LOCATIONS',
         payload: action.payload
      })
   } catch (error) {
      console.log('error in editSaga:', error);
   }
}




function* getDataSaga(action) {
   try {
      const userInfo = yield call(axios.get, `/api/locations`)
      yield dispatch({
         type: 'GET_DATA',
         payload: userInfo.data
      })
   } catch (error) {
      console.log('error in getDataSaga:', error);
   }
}




function* getDisplayLocationsSaga(action) {
   try {
      const userInfo = yield call(axios.get, `/api/locations/specific`)
      yield dispatch({
         type: 'SHOW_LOCATION',
         payload: userInfo.data
      })
      console.log('userInfo', userInfo);
      
      const locationCoordinates = yield axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${userInfo.data.city},+${userInfo.data.state}&key=AIzaSyDnjD2cYoMBqVyqqe4BtBugAQRNiXn7OTY`)
      yield dispatch({
         type: 'STORING_COORDINATES',
         payload: locationCoordinates.data.results[0].geometry.location
      })
   } catch (error) {
      console.log('error in getDataSaga:', error);
   }
}




function* graphDataSaga(action) {
   try {
      const userInfo = yield call(axios.get, `/api/locations/specific`)
      yield dispatch({
         type: 'SHOW_LOCATION',
         payload: userInfo.data
      })
      const locationCoordinates = yield axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${userInfo.data.city},+${userInfo.data.state}&key=AIzaSyDnjD2cYoMBqVyqqe4BtBugAQRNiXn7OTY`)
      yield dispatch({
         type: 'STORING_COORDINATES',
         payload: locationCoordinates.data.results[0].geometry.location
      })
      console.log('>>>>>>>', locationCoordinates);
      const graphData = yield axios(`https://api.darksky.net/forecast/cbbd7ef6d4a32d1afa75ace009b3393d/${locationCoordinates.lat},${locationCoordinates.lng}`)

      yield dispatch({
         type: 'GRAPH_DATA',
         payload: graphData.daily.data
      })
   } catch (error) {
      console.log('error in graphDataSaga:', error);

   }
}




function* newLocationSaga(action) {
   try {
      yield call(axios.post, `/api/locations`, action.payload)
      yield dispatch({
         type: 'CREATE_NEW_USER_LOCATION',
         payload: action.payload
      })
      yield dispatch({
         type: 'GET_DISPLAY_LOCATIONS',

      })
      const userInfo = yield call(axios.get, `/api/locations/specific`)
      yield dispatch({
         type: 'SHOW_LOCATION',
         payload: userInfo.data
      })
   } catch (error) {
      console.log('error in newLocationSaga:', error);

   }
}




export default function* rootSaga() {
   yield takeEvery('FETCH_COORDINATES', getDataSaga)
   yield takeEvery('GET_DISPLAY_LOCATIONS', getDisplayLocationsSaga)
   yield takeEvery('SUBMIT_DELETE', deleteSaga)
   yield takeEvery('SUBMIT_EDIT', editSaga)
   yield takeEvery('SUBMIT_NEW_LOCATION', newLocationSaga)
   yield takeEvery('GRAPH_CALL', graphDataSaga)


   yield all([
      userSaga(),
      loginSaga(),
      // watchIncrementAsync()
   ]);
}
