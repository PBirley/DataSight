
export const ADD_TO_STREAM_DATA = 'ADD_TO_STREAM_DATA'
export const addToStreamData = (data, streamName) => ({
  type: ADD_TO_STREAM_DATA,
  payload: {data, streamName}
})

export const RESET_DATA = 'RESET_DATA'
export const resetStreamData = (streamName) => ({
  type: RESET_DATA,
  payload: {streamName}
})