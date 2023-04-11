const WebSocket = require('ws');
const wsServer = new WebSocket.Server({ port: 8080 });

wsServer.on('connection', onConnect);

function onConnect(wsClient) {
    console.log('Новый пользователь');
    wsClient.send('Привет');

    wsClient.on('close', function() {
        console.log('Пользователь отключился');
    });

    wsClient.on('message', function(message) {
        console.log(message);
	  wsClient.send(message);
    });
}

console.log('Сервер запущен на 8080 порту');