import { parentPort } from 'worker_threads';
import { calculate } from './intensive-job';

if (parentPort) {
  parentPort.on('message', (data) => {
    if (!parentPort) return;

    const result = calculate(3, 4);
    parentPort.postMessage(result);
  });
}
