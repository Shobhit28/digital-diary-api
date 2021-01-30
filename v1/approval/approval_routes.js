const express = require('express');
const approval_router = express.Router();
const connection = require('../../configs/db-config')

approval_router.get('/v1/approval-list/:branchId', function (req, res) {
  const branch_detail_query = "select * from user where branch_id='" + req.params.branchId + "' and type='APPROVAL_PENDING'";
  connection.query(branch_detail_query, function (err, result) {
    if (err) throw err;
    res.status(200).send(result);
  });

})

approval_router.post('/v1/create-membership', function (req, res) {
  const approval = req.body;
  const update_user_query = "update user set type = 'APPROVAL_PENDING', branch_id ='" + approval.branchId + "' where email='" + req.headers.user_info + "'";
  connection.query(update_user_query, function (err, result) {
    if (err) throw err;
    res.status(201).send({ "type": "APPROVAL_PENDING" });
  });

});

module.exports = approval_router