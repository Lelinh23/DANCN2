var express = require('express');
var router = express.Router();
const {userDangKy, userDangNhap, checkExistUser, CapNhatToken} = require('../services/XacThucServices')
const { getUserData } = require('../services/UserServices')

/* POST users listing. */

// đăng ký
router.post('/register', async(req, res, next) => {
  let body = req.body;
  let response = await userDangKy(body);
  res.json(response)
});

// đăng nhập
router.post('/login', async(req, res, next) => {
  let body = req.body;
  let response = await userDangNhap(body);
  res.json(response)
});

//ngươi dùng hiện tại
router.get('/exist-user', async(req, res, next) => {
  let params = req.query;
  let response = await checkExistUser(params);
  res.json(response)
});

// người dùng 
router.get("/get-user", async (req, res) => {
  let email = req?.email
  let response = await getUserData(email)
  res.json(response)
});

// cập nhât token
router.post("/refresh-token", CapNhatToken);

module.exports = router;
