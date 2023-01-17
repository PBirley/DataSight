import { combineReducers } from "redux";
import { ADD_REPORTS, ADD_TO_STREAM_DATA, DELETE_REPORT, RESET_DATA } from "./actions";

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

const reportData = ( state = [], action) => {
  switch (action.type) {
    case ADD_REPORTS:
      return action['reports']
    case DELETE_REPORT:
      const id = action['id'];
      const stateCopy = [...state]
      const newState = stateCopy.filter(report => report['_id'] !== id)
      return newState

    default:
      return state
  }
}

const reducers = combineReducers({
  streamingData,
  reportData
})

export default reducers;