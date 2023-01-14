
export const ADD_TO_STREAM_DATA = 'ADD_TO_STREAM_DATA'
export const addToStreamData = (data) => ({
  type: ADD_TO_STREAM_DATA,
  data
})

export const RESET_DATA = 'RESET_DATA'
export const resetStreamData = () => ({
  type: RESET_DATA
})