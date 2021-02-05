const db = require('./db');

module.exports = {
    saveComment(content,blogId, userId){
        return db.query('insert into t_comment set ?', {
            content, 
            blog_id:blogId,
            user_id:userId
        });
    },
    getCom(){
        return db.query("SELECT t_blog.*, t_comment.*, t_user.username FROM t_blog, t_comment, t_user WHERE t_blog.blog_id=t_comment.blog_id and t_comment.user_id=t_user.user_id");
    }
}