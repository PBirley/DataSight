import Reports from "../models/model.js";

export const getReports = async (req,res) => {
  try {
    console.log('getting reports');
    const reports = await Reports.find();
    res.status(200).send(reports)
  } catch (error) {
    res.status(500).send({error: error})
  }
}

export const addReport = async (req, res) => {
  try {
    console.log('adding reports');
    const report = req.body;

    const newReport = new Reports(report);
    await newReport.save()

    //Return updated list
    const reports = await Reports.find();
    res.status(200).send(reports)

    
  } catch (error) {
    res.status(500).send({error:error})
  }
}

export const deleteReport = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('deleting: ', id);
    Reports.findByIdAndDelete(id, (err) => console.log(err));

    res.status(200)
  } catch (error) {
    res.status(500).send({error:error});
  }
}