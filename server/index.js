import express from 'express';
import router from './router.js';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const PORT = 4000;

// app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(logger);
function logger(req, res, next) {
  console.log(req.method ,req.originalUrl);
  next();
}

app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening @ http://localhost:${PORT}`);
});
