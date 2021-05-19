const Mock = require('mockjs');

module.exports = {
  'GET /api/list': (req, res) => {
    return res.json([{
      id: 1,
      name: Mock.mock('@ctitle')+req.query.name,
      age: '23',
      job: '前端工程师'
    }, {
      id: 2,
      name: Mock.mock('@ctitle')+req.query.name,
      age: '24',
      job: '后端工程师'
    }]);
  },
  _proxy: {
    changeHost: true,
  }
}