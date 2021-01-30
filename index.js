const port = 8080
const express = require('express');
const cors = require('cors');
const user_router = require('./v1/user/user_routes')
const branch_router = require('./v1/branch/branch_routes')
const approval_router = require('./v1/approval/approval_routes')


process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

const app = express()
// enable cors
app.use(cors());
app.options('*', cors())

app.use(express.json());

// check authorization
app.use(function (req, res, next) {
  console.log()
  if (req.headers['user_info'])
    next();
  else
    res.send(403, "Unauthorized");
  
})

// add routes

app.use(user_router);
app.use(branch_router);
app.use(approval_router);
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(200).send('Something broke!')
})

// start app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})