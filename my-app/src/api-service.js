import { updateStreamingData } from "./data-service";

const rootUrl = 'http://localhost:4000';

export const streamDemoDataStart = async (dispatch) => {
  const response = await fetch(rootUrl + '/streamDemoData/start');
  const reader = response.body.getReader();

  const read = async () => {
    const { done, value } = await reader.read();

    if (done) {
      console.log('All Data Recieved');
      return;
    }
    updateStreamingData(dispatch, value, 'demo');
    read()
  };
  read()
}

export const streamDemoDataStop = async () => await fetch(rootUrl + '/streamDemoData/stop');

export const startDetectionsOnStream = async (dispatch) => {
  const response = await fetch(rootUrl + '/getDetections/start');
  const reader = response.body.getReader();

  const read = async () => {
    const { done, value } = await reader.read();

    if (done) {
      console.log('All Data Recieved');
      return;
    }
    updateStreamingData(dispatch, value, 'liveStream_1')
    read()
  };
  read()
}

export const stopDetectionsOnStream = async () => await fetch(rootUrl + '/getDetections/stop');

export const startStream = () => fetch(rootUrl + '/stream/start');
export const stopStream = () => fetch(rootUrl + '/stream/end');

export const getImg = async (setAnalysedFrame) => {
  const response = await fetch(rootUrl + '/getLatestFrame');
  const { processedImg } = await response.json();
  // console.log(processedImg);
  if (processedImg) {
    const res = 'data:image/jpeg;base64, ' + processedImg;
    return res;
  } else {
    return null;
  }
}


// Report api

export const addReportToDb = async (reportTitle, source, demoData) => {
  const currentDate = new Date();
  const dateTime = currentDate.getFullYear() + '-' +
      (currentDate.getMonth() + 1).toString().padStart(2, '0') + '-' +
      currentDate.getDate().toString().padStart(2, '0') + ' ' +
      currentDate.getHours().toString().padStart(2, '0') + ':' +
      currentDate.getMinutes().toString().padStart(2, '0') + ':' +
      currentDate.getSeconds().toString().padStart(2, '0');

  fetch(rootUrl + '/report', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      reportTitle: reportTitle,
      source: source,
      dateCreated: dateTime,
      data: demoData
    })
  }).then(response => response.json()).then(data => {
    console.log(data)
  })
}

export const getReports = () => {
  return fetch('http://localhost:4000/reports');
}
