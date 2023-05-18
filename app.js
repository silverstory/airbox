const app = require('express')();
const {
  createProxyMiddleware
} = require('http-proxy-middleware');
const server = require('http').Server(app);

const bodyParser = require("body-parser");

const axios = require('axios');

const port = 80;

// app.use('/api', createProxyMiddleware({
//   target: 'http://192.168.64.150:364', // 'http://localhost:3310'
//   changeOrigin: true,
//   logLevel: 'debug'
// }));

// body-parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

// ciss notify
// verify visitor
app.post('/cissnotify', (req, res) => {

  const notify = req.body;

  let data = null;

  axios.post('http://192.168.23.8:8000/send-notification', notify, {
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(function (response) {
    // console.log(response.data);
    data = response.data;
    res.send(data);
  })
  .catch(function (error) {
    console.log(error);
    res.send({
      "success": false,
      "msg": "Something went wrong"
  });
  });
  
});
// end verify visitor
// end ciss notify

// verify visitor
app.post('/verifyvisitor', (req, res) => {

  const notify = req.body;

  let data = null;

  axios.post('http://192.168.64.150:364/api/v1/ciss/fetch', notify, {
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(function (response) {
    // console.log(response.data);
    data = response.data;
    res.send(data);
  })
  .catch(function (error) {
    console.log(error);
    res.send({
      "success": false,
      "msg": "Something went wrong"
  });
  });
  
});
// end verify visitor


// email qr code
// verify visitor
app.post('/verifyvisitorv2', (req, res) => {

  const notify = req.body;

  let data = null;

  axios.post('http://192.168.64.150:364/api/v1/ciss/findQrcode', notify, {
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(function (response) {
    // console.log(response.data);
    data = response.data;
    res.send(data);
  })
  .catch(function (error) {
    console.log(error);
    res.send({
      "success": false,
      "msg": "Something went wrong"
  });
  });
  
});
// end verify visitor
// email qr code

// verify employee
app.post('/verifyemployee', (req, res) => {

  // const hmac = req.params.text;
  const hmac = req.body.hmac;
  const bearer = req.body.bearer;

  let data = null;

  axios.get(`http://192.168.23.8/api/profile/${hmac}`, {
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
  .then(function (response) {
    // console.log(response.data);
    data = response.data;
    res.json(data);
  })
  .catch(function (error) {
    console.log(error);
    res.send({
      "success": false,
      "msg": "Something went wrong"
  });
  });
  
});
// end verify employee

// logs
app.post('/log', (req, res) => {

  const notify = req.body;

  let data = null;

  axios.post('http://192.168.23.8:3001/api/gateaccess/entry', notify, {
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(function (response) {
    // console.log(response.data);
    data = response.data;
    res.send(data);
  })
  .catch(function (error) {
    console.log(error);
    res.send({
      "status": 0,
      "message": "Something went wrong"
  });
  });
  
});
// end logs

// ciss auth token
app.post('/cissauth', (req, res) => {

  const notify = req.body;

  let data = null;

  axios.post('http://192.168.23.8/users/authenticate', notify, {
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(function (response) {
    // console.log(response.data);
    data = response.data;
    res.send(data);
  })
  .catch(function (error) {
    console.log(error);
    res.send({
      "success": false,
      "msg": "Something went wrong"
  });
  });
  
});
// end ciss auth token


// visitor photo
app.get('/visitorphoto', async (req, res) => {

  const visitorid = req.query.id;

  const arrayBuffer = await axios.get(`http://192.168.64.150:364/api/v1/ciss/getPhoto?id=${visitorid}`, {
    responseType: "arraybuffer"
  });

  res.set({
    'Content-Type': 'image/png',
    'Content-Length': arrayBuffer.data.length
  });

  res.send(arrayBuffer.data);
  
});
// end visitor photo

server.listen(port);

module.exports = app;


// /// test
// /// test
// const express = require('express');
// const bodyParser = require("body-parser");
// const app = express();
// const port = 8000;

// // body-parser
// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: false }));

// const notification = require('./routes/notification');
// app.use('/api', notification);

// const server = app.listen(port, () => {
//   console.log(`Server connection on  http://127.0.0.1:${port}`);  // Server Connnected
// });
// // Socket Layer over Http Server
// const socket = require('socket.io')(server);
// // On every Client Connection
// socket.on('connection', socket => {
//     console.log('Socket: client connected');
// });

// /// end test
// /// end test


///  askndklfhdskjfhs sdfhds jhdslf hdsljkhdsljf hsdjlf hlsdjfh lsdjfh dsjlf h
///  dsf kfhsdjkf hlsd fhksd kddlhsjdfgweLURWO;FHsfhdsfh sd;fhasd;fhk.sdhhdfs

// // worked

// const express = require('express');
// const bodyParser = require("body-parser");

// const app = express();
// const port = 8000;

// // body-parser
// app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: false }));

// const notification = require('./routes/notification');
// app.use('/api', notification);

// app.listen(port, () => console.log(`listening on http://localhost:${port}`));