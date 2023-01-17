
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


export const ADD_REPORTS = 'ADD_REPORTS'
export const addReports = (reports) => ({
  type: ADD_REPORTS,
  reports
})

export const DELETE_REPORT = 'DELETE_REPORT'
export const deleteReport = (id) => ({
  type: DELETE_REPORT,
  id
})