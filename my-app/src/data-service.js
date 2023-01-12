import { addToStreamData } from "./redux/reducer";

export const updateStreamingData = (dispatch, packet) => {
  //Convert data back to an array
  let chunk = new TextDecoder('utf-8').decode(packet)
  chunk = JSON.parse(chunk);

  //Add the current time
  chunk.unshift(Date.now())

  dispatch(addToStreamData(chunk));
}

export const parseGenderData = (data) => {
  const menData = data.filter(element => element[2] === 'man')
  const womanData = data.filter(element => element[2] === 'woman')

  return [menData.length, womanData.length]
};