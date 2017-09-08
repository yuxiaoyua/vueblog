<template>
    <div class="wraps">
        <header>
            <div class="log">
                <p>个人博客</p>
            </div>
            <div class="welcome">
                当前登录账户：{{username}}
            </div>
        </header>
        <main>
            <div class="pageLiat">
                <page-list></page-list>
            </div>
            <div class="pageContent">
                 <router-view></router-view>
            </div>
        </main>
    </div>
</template>
<script>
    import pageList from './page/main_left.vue'
    export default {
        data() {
            return {
                activeNames: ['1'],
                username: ""
            };
        },
        components: {
            pageList
        },
        mounted() {
            this.username = sessionStorage.getItem("username")
        }
    }
</script>
<style scoped>
    .wraps {
        width: 100%;
        height: 100%;
    }
    
    .wraps header {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        box-sizing: border-box;
        background: cadetblue;
        color: #fff;
    }
    
    .wraps header .log {
        float: left;
    }
    
    .wraps header .welcome {
        float: right;
    }
    
    .wraps main .pageLiat {
        float: left;
        width: 200px;
    }
    
    .wraps main .pageContent {
        float: left;
        width:80%;
        padding-left: 15px;
    }
</style>