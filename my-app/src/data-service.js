import { addToStreamData } from "./redux/reducer";

export const updateStreamingData = (dispatch, packet) => {
  let chunk = new TextDecoder('utf-8').decode(packet)
  chunk = JSON.parse(chunk);
  chunk.unshift(Date.now())
  console.log(chunk);

  dispatch(addToStreamData(chunk));
}

export const parseGenderData = (data) => {
  const menData = data.filter(element => element[2] === 'man')
  const womanData = data.filter(element => element[2] === 'woman')

  return [menData.length, womanData.length]
}
// export const peoplePerPeroid = []

// const updatePeoplePerPeroid = (peroid = 5000) => {

// } 

// export const genderTotal = {menTotal:0, womanTotal:0}

// const updateGenderTotal = () => {
//   const menData = streamingData.filter(element => element[2] === 'man')
//   genderTotal.menTotal = menData.length

//   const womanData = streamingData.filter(element => element[2] === 'woman')
//   genderTotal.womanTotal = womanData.length
// }