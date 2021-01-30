const express = require('express');
const branch_router = express.Router();
const connection = require('../../configs/db-config')

branch_router.get('/v1/branch-details/:branchId', function(req,res) {
  const branch_detail_query = "select * from branch where id='"+req.params.branchId+"'";
  connection.query(branch_detail_query, function(err, result){
    if(err) throw err;
    res.status(200).send(result[0]);
  });

})

branch_router.post('/v1/create-branch', function(req, res){
  const branch = req.body;
  const insert_branch_query = "insert into branch (name, address, city, pincode) values('" +
  branch.name + "','" +
  branch.address + "','"+
  branch.city+"','"+
  branch.pincode+
  "')";
  connection.query(insert_branch_query, (err, result) => {
    if (err) throw err;
    const branchId = result.insertId;

    const update_user_query = "update user set branch_id = "+branchId+", type = 'ADMIN' where email='"+req.headers.user_info+"'";
    connection.query(update_user_query, function(err, result) {
      if (err) throw err;
      res.status(201).send({"type":"ADMIN"});
    });
   
  });

});

module.exports = branch_router
