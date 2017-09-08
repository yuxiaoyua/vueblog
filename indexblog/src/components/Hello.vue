<template>
  <div class="hello">
    <div class="click">
      <p class="logo">
        YULOBO
      </p>
      <ul>
            <router-link tag="li" to='/myblog'>首页</router-link>
            <!--<router-link tag="li" to='/mytext'>我的文章</router-link>-->
            <router-link tag="li" to='/yuxiaoyu'>小喻聊聊</router-link>
            <router-link tag="li" to='/life'>生活趣事</router-link>
      </ul>
    </div>
    <div class="bgimg">
      <img src="../../static/images/banner1.jpg" alt="">
      <h3>
          I WANT WITH YOU FOREVER
          MY BLOG FOR YOU
      </h3>
      <p>
          From that day on, I feel that my life is over, leaving you how do I live?
      </p>
      <header class="container">
		<div class="site-branding">
			<h1 class="site-title">
				<span>small fish shop</span>
			</h1>
			<h2 class="site-description">Welcome to my shop !</h2>
		</div>
	</header>
    </div>
      <header>
          <h3>amiyu-喻小喻的技术博客</h3>
          <p>前端资料库</p>
      </header>
      <main>
        <div class="left">
          <router-view></router-view>
        </div>
        <div class="right">
          <div class="search">
             <el-autocomplete
                v-model="state4"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
            ></el-autocomplete>
          </div>
            <div v-for='item in headerset' class="menu">
            <el-collapse v-model="activeNames"   @change='settwo(item.id)'>
            <el-collapse-item :title="item.cnname" :name="item.id">
                <div v-for="key in twooption" @click='content(item.id)'>
                    {{key.cnname}}
                </div>
            </el-collapse-item>
            </el-collapse>
          </div> 
           <div class="date">
            <div class="date" default-value='Data' align='center'>
                <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0">
                </el-date-picker>
            </div>
          </div>
          <div class="main">
            <h3>视频教程</h3>
            <p>最新视频</p>
            <p>喻小喻带你玩转ES6</p>   
            <p>Vue合集-可按此顺序学习</p>
            <ol>
                <li>【第一季】VUE2.0内部指令(共8集)</li>
                <li>【第二季】VUE2.0全局API(共9集)</li>
                <li>【第三季】VUE2.0选项（共6集）</li>
                <li>【第四季】VUE2.0实例内置组件（共4集）</li>
            </ol>
            <ol>
                <li>喻小喻的VUE-CLI教程</li>
                <li>喻小喻的VUE-ROUTER教程</li>
                <li>VUE实战视频-快餐店收银系统</li>
                <li>CocosCreator视频（前端游戏制作）</li>
            </ol>
          </div>
        </div>
      </main>
  </div>
</template>
<script>
    import {
        mapState,
        mapMutations,
        mapGetters,
        mapActions
    } from 'vuex'
    export default {
        name: 'hello',
        data() {
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                value1: Date.now(),
                restaurants: [],
                state4: '',
                timeout: null,
                headerset: [],
                twooption: [],
                activeNames: ['1']
            }
        },
        computed: {
            //第一种
            ...mapState(['ccc', 'alldata']), //将vuex中的state的某个属性引入到data中,
        },
        methods: {
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
                this.axios.get("/api/front_article/getArticle?id=" + item.id).then(function(data) {
                    console.log(data)
                })
            },
            ...mapActions(['getdata', 'alldatas']),
            settwo(id) {
                var _this = this;
                this.axios.post("/api/front_article/getClassTwo", {
                    oneId: id
                }).then(function(data) {
                    _this.twooption = data.data.data
                })
            },
            content(id) {
                console.log(id)
            }
        },
        mounted() {

        },
        created() {
            var _this = this;
            this.axios.get("/api/front_article/getNav").then(function(data) {
                _this.$store.dispatch("getdata", data.data.data)
                _this.headerset = _this.ccc
            })
            this.axios.get("/api/front_article/getArticleAll").then(function(data) {
                _this.$store.dispatch("alldatas", data.data.data)
                    //获取搜索数据
                for (var i = 0; i < _this.alldata.length; i++) {
                    _this.restaurants.push({
                        value: _this.alldata[i].article_name,
                        id: _this.alldata[i].id
                    });
                }
            })
        }
    }
    window.onscroll = function() {
        var martop = window.pageYOffset;
        var ele = document.querySelector(".click");
        if (martop > 100) {
            ele.classList.add('scroll');
        } else {
            ele.classList.remove('scroll');
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .el-collapse-item__content div {
        height: 40px;
        cursor: pointer;
        border-bottom: 1px solid #ccc;
        line-height: 40px;
    }
    
    .menu {
        width: 80%;
        margin: 20px auto;
    }
    
    .emit,
    .date {
        width: 80%;
        margin: 0 auto;
        height: auto;
        margin-top: 20px;
        background: #fff;
    }
    
    .date {
        background: none;
    }
    
    .div1 {
        background: #fff;
    }
    
    .emit h3,
    .main h3 {
        width: 90%;
        margin: 5%;
        height: 35px;
        font-size: 30px;
        color: #ff2244;
    }
    
    .host {
        background: #fff;
    }
    
    .host h3 {
        width: 90%;
        margin: 5%;
        height: 35px;
        font-size: 30px;
        color: #ff2244;
    }
    
    .main {
        width: 80%;
        margin: 0 auto;
        background: #fff;
        height: auto;
        margin: 20px auto;
    }
    
    .main ol {
        border-top: 1px solid #ccc;
        padding: 10px 0;
    }
    
    .main ol li {
        width: 80%;
        font-size: 14px;
        height: auto;
        margin: 0 auto;
    }
    
    .emit {
        width: 80%;
        margin: 0 auto;
        height: auto;
        margin-top: 20px;
        background: #fff;
    }
    
    .emit p,
    .main p {
        height: 17px;
        margin: 5%;
        font-size: 16px;
        color: #ff2244;
    }
    
    .emit h5 {
        width: 90%;
        margin: 0 auto;
    }
    
    .emit h5 p {
        color: #333;
        height: auto;
        margin: 20px 0;
        border-top: 1px solid #ccc;
    }
    
    .search {
        width: 80%;
        margin: 0 auto;
        height: 45px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .search input {
        width: 90%;
        height: 35px;
        border: 1px solid #ccc;
        /*border: none;*/
        text-align: center;
    }
    
    .hello {
        width: 100%;
        position: relative;
        height: 100%;
    }
    
    header h3 {
        width: 100%;
        clear: both;
        height: 20px;
        line-height: 20px;
        font-size: 18px;
        color: #ff2244;
        padding-top: 20px;
        text-align: center;
    }
    
    header p {
        font-size: 14px;
        text-align: center;
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin-bottom: 25px;
        color: #fff;
    }
    
    .bgimg {
        width: 100%;
        height: auto;
        position: relative;
        background: rgba(0, 0, 0, 0.7) linear-gradient(transparent, #1a1c1e) repeat scroll 0 0;
    }
    
    .click.scroll {
        width: 100%;
        height: 60px;
        line-height: 60px;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
    }
    
    .click.scroll .logo {
        width: 20%;
        float: left;
        line-height: 60px;
        margin-left: 20px;
        font-size: 25px;
        color: #0AAC8E;
    }
    
    .click.scroll .logo:hover {
        color: #c6ae3c;
    }
    
    .click.scroll ul {
        width: 60%;
        height: 60px;
        line-height: 60px;
        margin: 0 auto;
        display: flex;
        float: right;
        justify-content: center;
        border-top: 1px solid #ccc;
    }
    
    .click.scroll ul li {
        line-height: 60px;
        float: left;
        margin: 0 30px;
        cursor: pointer;
        color: #fff;
    }
    
    .bgimg img {
        width: 100%;
        height: auto;
        position: relative;
        top: 0;
        left: 0;
        opacity: 0.6;
    }
    
    .bgimg h3 {
        position: absolute;
        height: 100px;
        text-align: center;
        font-size: 50px;
        color: #fff;
        width: 70%;
        margin-left: 15%;
        top: 200px;
        left: 0;
        z-index: 2;
    }
    
    .bgimg p {
        position: absolute;
        height: 30px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        width: 70%;
        margin-left: 15%;
        top: 400px;
        left: 0;
        z-index: 2;
    }
    
    .container {
        position: absolute;
        height: 50px;
        font-size: 20px;
        color: #fff;
        width: 70%;
        margin-left: 15%;
        top: 600px;
        left: 0;
        z-index: 2;
        text-align: center;
    }
    
    span {
        font-size: 25px;
    }
    
    header {
        width: 100%;
        height: auto;
    }
    
    .click {
        width: 90%;
        height: 100px;
        position: fixed;
        top: 0;
        left: 5%;
        background: rgba(0, 0, 0, 0);
        z-index: 3;
        line-height: 100px;
    }
    
    .click .logo {
        width: 20%;
        float: left;
        line-height: 100px;
        margin-left: 20px;
        font-size: 25px;
        color: #0AAC8E;
    }
    
    .click .logo:hover {
        color: #c6ae3c;
    }
    
    .click ul {
        height: 100px;
        line-height: 100px;
        margin: 0 auto;
        display: flex;
        float: right;
        justify-content: center;
        border-top: 1px solid #ccc;
    }
    
    .click ul li {
        line-height: 100px;
        float: left;
        margin: 0 30px;
        cursor: pointer;
        color: #fff;
    }
    
    main {
        width: 90%;
        margin: 0 auto;
    }
    
    .left {
        width: 70%;
        float: left;
    }
    
    .right {
        width: 30%;
        float: left;
    }
</style>