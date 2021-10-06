//import Libriry
var express = require('express');
const cors = require("cors");
var path = require('path');
const request = require('./connections');
var indexRouter = require('./Router');
var http = require('http');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

//Create Object
var app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use("/vendor",require('./Router/vendor.routes'));
app.use("/ticket",require('./Router/ticket.router'));
var port = 3003;
app.set('port', port);
console.log("server started",port)

var server = http.createServer(app);
server.listen(port);

// server.on('error', onError);
// server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */


//  function onError(error) {
//     if (error.syscall !== 'listen') {
//       throw error;
//     }

//     var bind = typeof port === 'string'
//       ? 'Pipe ' + port
//       : 'Port ' + port;

//     // handle specific listen errors with friendly messages
//     switch (error.code) {
//       case 'EACCES':
//         console.error(bind + ' requires elevated privileges');
//         process.exit(1);
//         break;
//       case 'EADDRINUSE':
//         console.error(bind + ' is already in use');
//         process.exit(1);
//         break;
//       default: throw error;
//     }
//   }

//   function onListening() {
//     var addr = server.address();
//     var bind = typeof addr === 'string'
//       ? 'pipe ' + addr
//       : 'port ' + addr.port;
//       console.log("bind: - ", bind);
//     // debug('Listening on ' + bind);
//   }