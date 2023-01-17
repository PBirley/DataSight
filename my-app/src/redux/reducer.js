import { combineReducers } from "redux";
import { ADD_TO_STREAM_DATA, RESET_DATA } from "./actions";

const dataStreamsIntialState = {
  'demo': [],
  'liveStream_1' : []
}

const streamingData = ( state = dataStreamsIntialState, action) => {
  switch (action.type) {
    case ADD_TO_STREAM_DATA:
      const {data, streamName} = action.payload;
      const newState = { 
        ...state,
        [streamName]: [...state[streamName], data ]
      }
      return newState
    case RESET_DATA:{
      const {streamName} = action.payload;
      const newState = {
        ...state,
        [streamName]: []
      }
      return newState; //state[action.payload.streamName] = [];
    }
    default:
      return state;
  }
}

const reducers = combineReducers({
  streamingData
})

export default reducers;