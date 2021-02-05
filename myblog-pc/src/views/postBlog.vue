<template>
<div id='bg'>
  <div>
    <h1>发表文章</h1>
    <p>标题：<input type="text" v-model="title" /></p>
    <p>
      内容：<textarea
        name=""
        id=""
        cols="20"
        rows="10"
        v-model="content"></textarea>
    </p>
    <p>
      <button @click="postBlog">发表</button>
    </p>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  created() {},
  methods: {
    postBlog() {
      let loginUser = this.$store.state.loginUser;
      if (loginUser) {
        this.$http
          .post("/blog/post", {
            title: this.title,
            content: this.content,
            userId:loginUser.user_id,
          })
          .then((res) => {
            let { state } = res.data;
            if (state == "success") {
              this.$router.push("/");
            } else {
              alert("发表文章失败，请返回重新操作");
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
<!--app。vue通用样式即可-->
<style  scoped>
#bg{
    background: url("../assets/images/post.jpg") no-repeat;
     background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
    }
</style>