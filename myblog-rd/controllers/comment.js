const commentModel = require("../models/commentModel");

module.exports = {
  postCom: async function (ctx, next) {
    let {content, blogId, userId } = ctx.request.body;
    let results = await commentModel.saveComment(content,blogId,userId);
    if (results.insertId > 0) {
      ctx.body = {
        state: "success",
      };
    } else {
      ctx.body = {
        state: "fail",
      };
    }
  },
  listCom: async (ctx, next) => {
    let results = await commentModel.getCom();
    if (results.length > 0) {
      ctx.body = {
        state: "success",
        com: results,
      };
    } else {
      ctx.body = {
        state: "fail",
      };
    }
  },
};