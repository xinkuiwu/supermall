import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Category = () => import('../views/category/Category')
const Detail = () => import('../views/detail/Detail')

// 添加这下面一段代码，就可以解决连续点击相同路径的报错 
 
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// }


Vue.use(VueRouter)
//里面配置四个映射关系
const routes =[
    {
        path:'',
        redirect:'/home'
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/category',
        component: Category
    },
    {
        path: '/detail/:iid',
        component: Detail
    },


] 
const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router