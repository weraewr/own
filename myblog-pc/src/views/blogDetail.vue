<template>
  <div class="container">
    <div class="blog">
      <div class="blog-title"><h3>{{ blog && blog.title }}</h3>
        <div class="blog-content"> <p>{{ blog && blog.content }}</p>
        </div><span>{{ blog && blog.post_time }}</span> 
      </div>
      <div class="comments">
          <div class="comment-content"> <textarea name="" cols="150"  rows="3"  v-model="content"></textarea>
          </div>
          <button @click="postCom">发表评论</button>
           <ul>历史评论：</ul>
          <div class="comment" v-for="item in comList" :key="item.blogId">
            <p>{{ item.comm_content }}</p>
            <div class="comment-info">
              <span class="post-time">评论时间：{{ item.comm_post_time }} </span>
              <span class="userinfo">评论用户：{{ item.username }}</span>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comList:[],
      blog: null,
      content:""
    };
  },
  created() {
    this.getBlogDetail();
    //this.getComData();
  },
  methods: {
    getBlogDetail() {
      let blogId = this.$route.params.blogId;
      //测试是否能返回blogid
      //console.log("blog_id:",blogId);
      this.$http.get("/blog/detail", {
          params: {
            blogId:blogId,
          },
        }
        )
        .then((res) => {
          let { state, blog } = res.data;
          if (state == "success") {
            this.blog = blog;
            this.comList = blog.comments;
          }
        });
    },
    postCom() {
       let loginUser = this.$store.state.loginUser;
       if (loginUser) {
         let blogId = this.$route.params.blogId;
         let postTime = new Date();
         this.$http
           .post("/blog/comment", {
             content: this.content,
             blogId:blogId,
             userId:loginUser.user_id,
             postTime:postTime
           })
           .then((res) => {
             console.log(666);
             let { state } = res.data;
             if (state == "success") {
               this.$router.push("/")
             } else {
               alert("发表评论失败，请返回重新操作");
             }
           });
       }else{
           alert('您当前未登录，点击确认返回登录界面');
           this.$router.push('/login');
       }
     },
   },
};
</script>

<style scoped>
.blog {
  margin: 20px auto;
  padding: 20px;
  background: #cccccc;
}
.blog-title {
  padding: 10px;
}
.blog-content {
  padding: 10px;
}
.comment {
  padding: 20px;
}
.comment-info {
  float: right;
}

</style>
