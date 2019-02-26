import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';

const userLocations = (state = [], action) => {
   switch (action.type) {
      case 'GET_DATA':
         // console.log('()()()()()', action.payload);
         return action.payload;
      case 'CREATE_NEW_USER_LOCATION':
         console.log('VVVVVVVV', action.payload);
         return action.payload;
      default:
         return state;
   }
}

const displayLocation = (state = [], action) => {
   switch (action.type) {
      case 'SHOW_LOCATION':
         // console.log('IIIIIII', action.payload);
         return action.payload;
      case 'SWITCH_LOCATION':
         return action.payload;
      default:
         return state;
   }
}

const coordinateStore = (state = {}, action) => {
   switch (action.type) {
      case 'STORING_COORDINATES':
         // console.log('+++++++', action.payload);

         return action.payload;
      default:
         return state;
   }
}

const graphStore = (state = [], action) => {
   switch (action.type) {
      case 'GRAPH_DATA':
         // console.log('-_-_-_-', action.payload);
         return action.payload;
      default:
         return state;
   }
}

// const switchedLocation = (state = '', action) => {
//    switch (action.type) {
//       case 'SWITCH_LOCATION':
//          return action.payload;
//       default:
//          return state;
//    }
// }

const store = combineReducers({
   user,
   login,
   userLocations,
   displayLocation,
   coordinateStore,
   graphStore,
   // switchedLocation
});



export default store;
