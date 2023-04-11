# WebSocketUniversal

Cross platform universal web socket (server / client) **C++ library**.
The repository is based on [IXWebSocket](https://github.com/machinezone/IXWebSocket).
The repository includes **built libraries** and a **sample client project**, as well as a **server based on Node.js**. **TLS** is currently **disabled** in the assembly.

## Documentation
Usage links [GitHub](https://github.com/machinezone/IXWebSocket/blob/master/docs/usage.md) and [Web](https://machinezone.github.io/IXWebSocket/usage/)

## Getting started

The compiled shared libraries of the **x32** and **x64** architectures for **Windows** and **Linux** are located in [lib directory](https://gitlab.dreamkas.ru/fisgo/web_socket_universal/-/tree/main/lib)

## Example (Client side)

WebSocket client example is located in [ws_client_demo](https://gitlab.dreamkas.ru/fisgo/web_socket_universal/-/tree/main/example/ws_client_demo).
The example is based on cross-platform **Cmake**, which allows you to build an executable file for your target architecture and operating system.
Currently supported **x32** and **x64** architectures for **Windows** and **Linux**.
Below are the build steps for the example:
```
cd example/ws_client_demo
mkdir build
cd build
cmake ..
make
```
For **Windows x32** and **MSVC** you must run cmake with **architecture key**:
```
cmake -A Win32 ..
```

Copying **.dll** supported library file for **Windows** to the build folder is done **automatically**.
For example for **Windows** the build result contains the following main files:

```
ls -l
demo.exe
ixwebsocket.dll
```
After execute **demo.exe** you can enter **url** (for example **ws://localhost:8080**) and test connection to the server. You can enter and send a message, the server response will be displayed in the log.
## Test Server with Node.js
WebSocket server example is located in [ws_server_node_js](https://gitlab.dreamkas.ru/fisgo/web_socket_universal/-/tree/main/example/ws_server_node_js). The server is listening on a **ws://localhost:8080**.
Below are the build and run steps for the example:
```
cd websocket-server-node
npm init
npm install ws
npm install --save-optional utf-8-validate
node server.js
```
