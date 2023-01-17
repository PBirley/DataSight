import mongoose from 'mongoose';

async function main () {
  //Connecting to db
  console.log('connected to database');
  await mongoose.connect('mongodb+srv://PBirley:vyJIXOyinLk6pxYS@todolist.vmth9w2.mongodb.net/?retryWrites=true&w=majority');
}
main().catch(err => console.log(err));

export default mongoose;