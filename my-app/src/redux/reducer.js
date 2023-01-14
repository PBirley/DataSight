import { combineReducers } from "redux";
import { ADD_TO_STREAM_DATA, RESET_DATA } from "./actions";

// const ADD_TO_STREAM_DATA = 'ADD_TO_STREAM_DATA'
// export const addToStreamData = (data) => ({
//   type: ADD_TO_STREAM_DATA,
//   data
// })

const streamingData = ( state = [], action) => {
  switch (action.type) {
    case ADD_TO_STREAM_DATA:
      const copyState = state.slice(0)
      copyState.push(action.data)
      return copyState;
    case RESET_DATA:
      return [];
    default:
      return state;
  }
}

const reducers = combineReducers({
  streamingData
})

export default reducers;