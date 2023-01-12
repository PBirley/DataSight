import { addToStreamData } from "./redux/reducer";

export const updateStreamingData = (dispatch, packet) => {
  //Convert data back to an array
  let chunk = new TextDecoder('utf-8').decode(packet);
  chunk = JSON.parse(chunk);

  //Add the current time
  chunk.unshift(Date.now());

  dispatch(addToStreamData(chunk));
}

export const parseGenderData = (data) => {
  const menCount = data.reduce((count, element) => count + (element[2] === 'man'), 0);
  const womanCount = data.reduce((count, element) => count + (element[2] === 'woman'), 0);

  return [menCount, womanCount];
};

export const parseEthnicityData = (data) => {
  const ethnicities = ['white','black','asian','middle-east','latin american'];
  const dataCounts = [];
  for (const category of ethnicities) {
    dataCounts.push( data.reduce((count, element) => count + (element[4] === category), 0) );
  }

  return dataCounts;
};

export const parseAgeData = (data) => {
  const ageBrackets = [[0,20], [21,30], [31,40], [41,60], [61,Infinity]];
  const ageCounts = [];
  for (const ageBracket of ageBrackets) {
    let count = data.reduce((count, element) => count + (element[3] >= ageBracket[0] && element[3] <= ageBracket[1]), 0);
    ageCounts.push(count);
  }

  return ageCounts;
}