<template>
  <div class="hello">
     <h2>
         {{data.article_name}}
     </h2>
     <h4>
        {{data.content}}
     </h4>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters,
    mapMutations,
    mapState
} from 'vuex'
    export default {
        name: 'hello',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App',
                data: ''
            }
        },
        computed:{
            ...mapState(['olddata'])
        },
        methods:{
            
        },
        mounted() {
            if (typeof(this.$route.query.data)=='object') {
                this.data = this.$route.query.data;
                sessionStorage.data=JSON.stringify(this.data)
            } else {
                 this.data=JSON.parse(sessionStorage.data)            
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h4 {
        color: #ccc;
        font-size: 20px;
        line-height: 25px;
        text-indent: 2em;
        margin-left: 15px;
    }
    
    h2 {
        color: #fff;
        font-size: 24px;
        line-height: 40px;
        text-align: center;
        margin-left: 15px;
    }
    
    .img {
        width: 100%;
        height: auto;
        display: flex;
        margin-top: 10px;
    }
    
    .img p {
        flex: 1;
        margin-left: 15px;
    }
    
    .img p img {
        width: 100%;
        height: auto;
    }
</style>