import { updateStreamingData } from "./data-service";

const rootUrl = 'http://localhost:4000';

export const streamData = async (dispatch) => {
  const response = await fetch(rootUrl + '/streamData');
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

export const startStream = () => fetch(rootUrl +'/startStream');

export const stopStream = () => fetch(rootUrl +'/stopStream');

export const getImg = async (setAnalysedFrame) => {
  const response = await fetch(rootUrl + '/getLatestFrame');
  const { processedImg } = await response.json();
  // console.log(processedImg);
  if (processedImg.length > 0) {
    const res = 'data:image/jpeg;base64, ' + processedImg;
    console.log('update');
    return res;
  } else {
    console.log('no image', processedImg);
    return null;
  }
}