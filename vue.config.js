/*
 * @Author: bucai
 * @Date: 2021-05-19 16:28:21
 * @LastEditors: bucai
 * @LastEditTime: 2021-05-19 16:42:59
 * @Description: 
 */
const path = require('path')
const apiMocker = require('mocker-api')

module.exports = {
  devServer: {
    before (app) {  // 注意，此处引用的是自定义的接口文件
      apiMocker(app, path.resolve('./mock'), {
        proxy: {
          // '/repos/*': 'https://api.github.com/',
        },
        changeHost: true,
      })
    }
  }
}