import {sampleData} from '../data/sample_data.js'

function sendPacket(res, packet) {
  res.write(packet)
} 

//change this to for loop that waits between sends
export const streamData = (req, res) => {
  try {
    const data = [...sampleData.slice(0)]
    for (let row of data) {
      const sendAt = row[0];
      const packet = JSON.stringify(row.slice(1));
      setTimeout(() => {
        res.write(packet)
        console.log(packet)
      }, sendAt);
    }
    setTimeout(() => {
      console.log('stream ended');
      res.end()
    }, data.slice(-1)[0][0]);
    return
  } catch (error) {
    console.log(error)
  }
}