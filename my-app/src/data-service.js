import { addToStreamData } from "./redux/actions";

export const updateStreamingData = (dispatch, packet) => {
  //Convert data back to an array
  let chunk = new TextDecoder('utf-8').decode(packet);
  chunk = JSON.parse(chunk);

  //Add the current time
  chunk.unshift(Date.now());

  console.log('adding new detections', chunk);

  dispatch(addToStreamData(chunk));
}

/*
  TODO: Current algorithms are a bit inefficent as they go through the entire array again 
  to update the info. Instead result should be updated per element added to the streamData
*/

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

export const countPeoplePerPeroid = (data) => {
  //each array element [timestamp, count]
  const countPerPeroid = [];

  let peroid = 10000;
  
  //TODO: Intelligent resizing
  // if (data.length > 20) {
  //   const dataPoint = 20;
  //   peroid = (data.slice(-1)[0][0]-data[0][0])/dataPoint;
  // }

  if (data.length === 0 ) return countPeoplePerPeroid
  //intialize at
  let currentTimestamp = data[0][0] + peroid;
  let peoridCount = 0;
  for (const el of data) {
    if (el[0] <= currentTimestamp) {
      peoridCount++;
    }
    else {
      countPerPeroid.push([currentTimestamp,peoridCount]);
      currentTimestamp += peroid;
      if (el[0] <= currentTimestamp)
        peoridCount = 1;
      else 
        peoridCount = 0;
    }
  }
  countPerPeroid.push([currentTimestamp,peoridCount]);

  return [countPerPeroid, peroid];
}