const blogModel = require("../models/blogModel");

module.exports = {
  postBlog: async function (ctx, next) {
    let { title, content, userId } = ctx.request.body;
    let results = await blogModel.saveBlog(title, content,userId);
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
  postBlogCom:async (ctx, next) => {
    let { content,blogId,postTime,userId}= ctx.request.body;
    let results = await blogModel.saveCom(content,blogId,postTime,userId);
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
  listBlog: async (ctx, next) => {
    let results = await blogModel.getBlogs();
    if (results.length > 0) {
      ctx.body = {
        state: "success",
        blogs: results,
      };
    } else {
      ctx.body = {
        state: "fail",
      };
    }
  },
   getBlog: async (ctx, next) => {
    let { blogId } = ctx.query; 
    //%%%%%44行我丢。非let { blogId } = ctx.params;原因见笔记tit7。

    let results = await blogModel.getBlogById(blogId); 
    if (results.length > 0) {
      let { blog_id, title, content, post_time } = results[0];
      let blogInfo = {
        blog_id,
        title,
        content,
        post_time,
      };
      blogInfo.comments = [];
      for (let i = 0; i < results.length; i++) {
        let obj = results[i];
        blogInfo.comments.push({
          comm_id: obj.comm_id,
          comm_content: obj.comm_content,
          comm_post_time: obj.comm_post_time,
          username: obj.username
        });
      }
      ctx.body = {
        state: "success",
        blog: blogInfo
      };
    }else {
      ctx.body = {
        state: "没有此条blog",
      };
    } 
  }, 
  
  
}; 