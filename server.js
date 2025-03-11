const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        if (message === 'Start') {
            const interval = setInterval(() => {
                const animationData = {
                    frame: Math.floor(Math.random() * 100), 
                };
                ws.send(JSON.stringify(animationData));
            }, 100); 

            ws.on('close', () => {
                clearInterval(interval);
                console.log('Client disconnected');
            });

            ws.on('message', (message) => {
                if (message === 'Stop') {
                    clearInterval(interval);
                    console.log('Stopped sending animation data');
                }
            });
        }
    });
});

console.log('WebSocket server is running on ws://localhost:8080');