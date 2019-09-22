import cluster from 'cluster';
import os from 'os';

const cpusCount: number = os.cpus().length;

if (cluster.isMaster) {
    console.log(`Master start! cpu: ${cpusCount} Pid: ${process.pid}  `);
    for (let index: number = 0; index < cpusCount - 1; index++) {
        cluster.fork();
    }

    cluster.on('exit', (worker: cluster.Worker, code: number) => {
        console.log(`Worker died! PidL: ${worker.process.pid}.  Code: ${code}`);
        if (code === 1) {
            cluster.fork();
        }
    });
} else {
    require('./server');
}
