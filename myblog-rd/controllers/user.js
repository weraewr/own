const userModel = require("../models/userModel");
const {createToken} = require('../auth')

module.exports = {
  register: async function (ctx, next) {
    let { username, password } = ctx.request.body;
    let results = await userModel.saveNameAndPwd(username, password);
    if (results.length > 0) {
      ctx.body = {
        state: "success",
      };
    } else {
      ctx.body = {
        state: "fail",
      };
    }
  },
  login: async function (ctx, next) {
    //token的步骤
    // 1. 接数据
    // 2. 验证
    // 3. 连数据库
    // 4. 根据数据库操作的结果，返回相应的信息
    let { username, password } = ctx.request.body;
    let results = await userModel.getByNameAndPwd(username, password);
    if (results.length > 0) {
      // 登录成功
      // 生成token
      let payload = {
        userId: Math.random(),
        username,
      };
      var token = createToken(payload);
      //token正确的操作
      ctx.body = {
        state: "success",
        token,
        user: results[0]
      };
    } 
    //token错误的操作
    else {
      ctx.body = {
        state: "fail"
      }
    }
  },
};
