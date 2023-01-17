import mongoose from './index.js';

//schema for model
const reportSchema = new mongoose.Schema({
  reportTitle: String,
  source: String,
  dateCreated: String,
  data: [[]]
});

//compile schema into model
const Reports = mongoose.model('reports', reportSchema);

export default Reports;