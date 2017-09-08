<template>
  <div class="mains">
        <div class="emit" v-for="item in result">
          <router-link :to='{path:"/mytext",query:{data:item}}'>
            <div>
              <img :src="item.img" alt="">
                  <h3>{{item.article_name}}</h3>
                  <p>阅读：2,780 次 【 By 】 {{item.editer}}  / {{item.time}}</p>
                  <h5>
                    <p class="daodu">
                      导读:{{item.daodu}}  
                    </p>
                    <p class="content">
                        {{item.content}}
                    </p>    
                  </h5>
            </div> 
          </router-link>
        </div>
                <!--分页-->
  <!--<div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>-->
  <!--分页-->
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
                msg: 'Welcome to Your Vue.js App',
                data: [],
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
            }
        },
        computed: {
            //第一种
            ...mapState(['result']), //将vuex中的state的某个属性引入到data中,
        },
        methods: {
            ...mapMutations(['add']),
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        mounted() {
            //获取数据
            this.$store.commit("add", this)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mains {
        display: flex;
        width: 100%;
        height: auto;
        flex-wrap: wrap;
    }
    
    .emit h5 p.daodu {
        margin: 10px auto;
        text-align: center;
        padding-top: 10px;
        max-height: 100px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    
    .emit h5 p.content {
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
    }
    
    .emit {
        width: 40%;
        margin: 20px auto;
        height: auto;
        margin-top: 20px;
        background: #fff;
        cursor: pointer;
    }
    
    .block {
        margin-bottom: 30px;
    }
    
    .emit img {
        width: 100%;
        height: auto;
        margin: 0 auto;
    }
    
    .emit h3 {
        width: 90%;
        margin: 5%;
        height: auto;
        font-size: 20px;
        color: #ff2244;
    }
    
    .emit p {
        width: 80%;
        height: auto;
        margin: 5%;
        margin: 0 auto;
        font-size: 14px;
        color: #ff2244;
    }
    
    .emit h5 {
        width: 100%;
        margin: 0 auto;
    }
    
    .emit h5 p {
        color: #333;
        height: auto;
        border-top: 1px solid #ccc;
    }
</style>