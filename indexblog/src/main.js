// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Vuex from 'vuex'
Vue.use(element)
Vue.use(Vuex)
Vue.use(vueAxios, axios)
var store = new Vuex.Store({
    state: {
        ccc: null,
        result: null,
        alldata: null,
    },
    mutations: {
        add(state, _this) {
            _this.axios.get("/api/front_article/getArticleAll").then(function(data) {
                state.result = data.data.data
            })
        },
    },
    getters: {

    },
    actions: {
        getdata(context, result) {
            context.state.ccc = result;
        },
        alldatas(context, result) {
            context.state.alldata = result;
        }
    }
})
Vue.config.productionTip = false
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})