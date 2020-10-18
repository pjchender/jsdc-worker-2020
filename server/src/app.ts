import express from 'express';

const app = express();
import cors from 'cors';
const port = 5000;
import { calculate } from './intensive-job';
import path from 'path';
import { Worker } from 'worker_threads';

declare global {
  namespace Express {
    interface Request {
      requestTime: number;
    }
  }
}

app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});
app.use(cors());

// normal api request
app.get('/without-intensive-job', (req, res) => {
  const costTime = Date.now() - req.requestTime;
  res.json({
    costTime,
  });
});

// api request with intensive job
app.get('/intensive-job', (req, res) => {
  // const result = calculate(3, 4);
  // const costTime = Date.now() - req.requestTime;
  // res.json({
  //   result,
  //   costTime,
  // });

  function getResult() {
    return new Promise((resolve) => {
      const result = calculate(3, 4);
      resolve(result);
    });
  }

  getResult().then((result) => {
    const costTime = Date.now() - req.requestTime;
    res.json({
      result,
      costTime,
    });
  });
});

app.get('/intensive-job-with-worker', (req, res) => {
  const worker = new Worker(path.join(__dirname, 'worker.js'));
  worker.postMessage('start to work');
  worker.on('message', (data) => {
    const costTime = Date.now() - req.requestTime;
    res.json({
      result: data,
      costTime,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
