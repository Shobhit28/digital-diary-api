const express = require('express');
const user_router = express.Router();
const connection = require('../../configs/db-config')


user_router.get('/v1/user-details', function(req,res) {
  const user_detail_query = "select * from user where email='"+req.headers.user_info+"'";
  connection.query(user_detail_query, function(err, result){
    if(err) throw err;
    res.status(200).send(result[0]);
  });

})

user_router.get('/v1/user-list/:branchId', function(req,res) {
  const user_detail_query = "select * from user where branch_id='"+req.params.branchId+"' and type IN('ADMIN', 'MEMBER')";
  connection.query(user_detail_query, function(err, result){
    if(err) throw err;
    res.status(200).send(result);
  });

})

user_router.put('/v1/user-type', function(req, res) {
  const userId = req.body.userId;
  let type = 'NEW';
  if (req.body.status === 'APPROVED') {
    type = 'MEMBER';
  }
  const update_user_type_query = "update user set type='"+type+"' where id="+userId;
  connection.query(update_user_type_query, function(err, result){
    if(err) throw err;
    res.status(200).send({"type": type});
  })


})



user_router.post('/v1/create-user', function (req, res) {

  const user = req.body;
  const search_query = "select * from user where email='" + user.email + "'";
  connection.query(search_query, (err, result) => {
    if (result && result.length > 0){
      res.send({"type": result[0].type});
      return;
    }
    const query = "insert into user (name, email, type) values('" + user.name + "','" + user.email + "','NEW')";
    connection.query(query, (err, result) => {
      if (err)
        console.log(err);
      res.send({
        "type": "NEW"
      });
    });
  });
});


module.exports = user_router
