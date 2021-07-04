var express = require('express')
const app = express();
const http = require('http').Server(app); 
const io = require('socket.io')(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });;

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-with, Accept, Authorization, authorization');
  res.header('Access-Control-Allow-Methods','OPTIONS,GET, POST, PUT, DELETE');
   next();
});
/**
 * create server
 */
 http.listen(3002, () => {
  console.log(`listening on *`);
});








// io.on('connection', client => {
//   console.log("A user connected!!");
//   setInterval(() => {
//   //  console.log("DAta")
//   //DataTransfer({data:socket.handshake.query['foo']})
//   client.emit('event',{data:socket.handshake.query['foo']}, Math.random());
//   },1000);
//   client.on('disconnect', () => { 
//     console.log("A user disconnected!!");
//   });
// });