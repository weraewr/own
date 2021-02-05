<template>

<div id='bg'>
  <div class="list-name">
   <ul>欢迎来到毕员博的个人博客</ul>
  </div>
  <div class='issue'>
    <ul>注意：您可以在评论区畅所欲言，但您不可以发表文章，还请见谅</ul>
  </div>
  <div class="container">
    <div class="blog-list">
      <div class="blog" v-for="item in blogList" :key="item.blog_id"> 
        
        <h3 class="blog-title">
          <router-link :to="{ path: '/blog/detail/' + item.blog_id}">{{item.title}}</router-link>
        </h3>
        <p class="blog-content">{{ item.content }}</p>
        <span class="post-time">{{ item.postTime }}</span>  
        <span></span>
      </div>
      <button @click="goPostBlog"> </button>
      </div>
    </div>
  </div>
 
</template>
<script>
export default {
  
  data() {
    return {
      blogList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get("/blog/list")
        .then((res) => {
          let { state,blogs } = res.data;
          if (state == "auth-fail") {
            alert("请求未授权，请重试!");
          } else if (state == "success") {
            this.blogList = blogs;
          }
         
        });
    },
    goPostBlog(){
      this.$router.push("/blog/post");
    },
    
  },
};
</script>

<style scoped>
#bg{
    background: url("../assets/images/index.png") no-repeat;
     background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
    }
.list-name{
  font-size: 40px;
  color: blue;
  font-style:italic;
}
.issue{
  font-size:20px;
  color: black;
}
.blog-list {
  width: 815px;
  margin: 20px auto;
}
.blog {
  background: #cccccc;
  padding: 20px;
  margin: 20px 0;
}
.blog-title,
.blog-content,
.post-time {
  margin: 20px 0;
}
</style>