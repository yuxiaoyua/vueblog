import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import myblog from '@/components/mytext'
import yuxiaoyu from '@/components/yuxiaoyu'
import life from '@/components/life'
import mytext from '@/components/my'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Hello',
        component: Hello,
        redirect: 'myblog',
        children: [{
            path: 'myblog',
            name: 'myblog',
            component: myblog
        }, {
            path: 'mytext',
            name: 'mytext',
            component: mytext
        }, {
            path: 'life',
            name: 'life',
            component: life
        }, {
            path: 'yuxiaoyu',
            name: 'yuxiaoyu',
            component: yuxiaoyu
        }]
    }]
})