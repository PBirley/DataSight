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

    updateStreamingData(dispatch, value);

    read()
  };
  read()
}

export const streamDemoDataStop = async () => await fetch(rootUrl + '/streamDemoData/stop');

export const startDetectionsOnStream = async (dispatch) => {
  const response = await fetch(rootUrl + 'getDetections/start');
  const reader = response.body.getReader();

  const read = async () => {
    const { done, value } = await reader.read();

    if (done) {
      console.log('All Data Recieved');
      return;
    }

    updateStreamingData(dispatch, value)
    read()
  };
  read()
}


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


export const stopDetectionsOnStream = async () => await fetch('http://localhost:4000/getDetections/stop');