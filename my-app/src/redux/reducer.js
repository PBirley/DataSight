import { combineReducers } from "redux";

const ADD_TO_STREAM_DATA = 'ADD_TO_STREAM_DATA'
export const addToStreamData = (data) => ({
  type: ADD_TO_STREAM_DATA,
  data
})

const streamingData = ( state = [], action) => {
  switch (action.type) {
    case ADD_TO_STREAM_DATA:
      const copyState = state.slice(0)
      copyState.push(action.data)
      return copyState//state.push(action.data);
    default:
      return state;
  }
}

const reducers = combineReducers({
  streamingData
})

export default reducers;