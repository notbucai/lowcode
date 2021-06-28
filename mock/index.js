const Mock = require('mockjs');

module.exports = {
  'GET /api/list': (req, res) => {
    return res.json({
      total: 10,
      list: [{
        id: 1,
        name: Mock.mock('@ctitle') + '-' + req.query.keywords,
        age: '23',
        job: '前端工程师'
      }, {
        id: 2,
        name: Mock.mock('@ctitle') + '-' + req.query.keywords,
        age: '24',
        job: '后端工程师'
      }]
    });
  },
  'DELETE /api/delete': (req, res) => {
    return res.json({
      total: 10,
      list: [{
        id: 1,
        name: Mock.mock('@ctitle') + '-' + "删除",
        age: '23',
        job: '前端工程师'
      }]
    });
  },
  _proxy: {
    changeHost: true,
  }
}