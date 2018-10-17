var express = require('express');
var router = express.Router();
const USER_MAP = {
  super_admin: {
    name: 'super_admin',
    user_id: '1222',
    access: ['super_admin', 'admin'],
    token: 'super_admin',
    avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
  },
  admin: {
    name: 'admin',
    user_id: '2222',
    access: ['admin'],
    token: 'admin',
    avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
  }
}

router.get('/get_info', function (req, res, next) {
  res.send(USER_MAP[req.query.token]);
});

router.post('/login', function (req, res, next) {
  res.send({ token: USER_MAP[req.body.userName].token });
});

router.post('/logout', function () {

});

module.exports = router;
