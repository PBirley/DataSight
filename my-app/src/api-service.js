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