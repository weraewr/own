import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import BlogDetail from '../views/blogDetail.vue'
import PostBlog from '../views/postBlog.vue'
import Text from '../views/text.vue'
import Register from '../views/register.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blog/detail/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/post',
    name: 'PostBlog',
    component: PostBlog
  },
  {
    path: '/text',
    name: 'Text',
    component: Text
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
