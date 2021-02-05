<template>
<div id=bg>
    <div class="container">
        <div class="login-form">
            <h3>用户注册</h3>
            <p>
                用户名：<input type="text" name="username" v-model="username">
            </p>
            <p>
                密码：<input type="password" name="password" v-model="password">
            </p>
            <p>
                <button @click="doRegister" class="btn">注册</button>
            </p>
            
        </div>
    </div>
    </div>
</template>

<script>
export default{
data() {
    return {
      username: "",
      password: "",
    };
  },
   created() {},
    methods:{
 doRegister() {
               this.$http
        .post("/user/register", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
            let {state} = res.data;
          if (state == "success") {
           
            this.$router.push('/login');
          } else {
            this.$router.push('/login');
            alert('注册成功，请前往登录!');
          }
        });
}
  }
}
</script>

<style scoped>
#bg{
    background: url("../assets/images/login.jpg") no-repeat;
     background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
    }
.login-form {
  width: 650px;
  background: #cccccc;
  margin: 40px auto;
  padding: 20px 0;
  text-align: center;
}
.login-form p {
  padding: 20px 0;
}

.btn {
  width: 70px;
}
</style>