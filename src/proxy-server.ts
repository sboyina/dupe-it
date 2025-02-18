import express  from 'express';
import cors from 'cors';
import httpProxy from 'http-proxy';

export function startApp(config: {port: number, target: string}) {
    // Initiate Express and create a router.
    const app = express();
    app.use(cors({
        origin: true,
        credentials: true 
    }))
    const router = express.Router();
    // Create a proxy server.
    const proxy = httpProxy.createProxyServer();

    // This is the method being used by the ingest route.
    const ingest = (req: any, res: any) => {
        proxy.web(req, res, {
            target: config.target,
            changeOrigin: true,
            xfwd: true,
            headers: {
                // These headers aren't necessary, but are useful for our metrics.
                'X-Real-IP': req.ip,
                'X-Forwarded-For': req.ip,
                'X-Forwarded-Host': req.hostname,
            },
        });
    };
    proxy.on('proxyReq', function(proxyReq, req: any, res, options) {
        proxyReq.path = req.originalUrl;
        proxyReq.setHeader('sec-fetch-mode', 'no-cors');
        proxyReq.setHeader('origin', config.target);
        proxyReq.setHeader('referer', config.target);
    });
    router.use('/*', ingest);
    app.use(router);
    app.listen(config.port, () => {
        console.log(`Dupe-It is running on port ${config.port}.`);
    }).on('error', (e) => {
        console.error(`Failed to start Dupe-It server on port ${config.port}.`, e);
    });
}