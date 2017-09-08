<template>
  <div class="hello">
<el-row>
  <el-col :span="24"><div class="grid-content bg-purple-dark">mytext</div></el-col>
</el-row>
<el-row>
  <el-col :span="12"><div class="grid-content bg-purple">
    <img src="../../static/images/blog2.jpg">
    </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light">
    <img src="../../static/images/blog2.jpg">
    </div></el-col>
</el-row>
<el-row>
  <el-col :span="8"><div class="grid-content bg-purple">
      <img src="../../static/images/blog8.jpg" alt="">
    </div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple-light">
      <img src="../../static/images/blog7.jpg" alt="">
    </div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple">
      <img src="../../static/images/blog4.jpg" alt="">
    </div></el-col>
</el-row>
<el-row>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
<el-row>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
  </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-row {
        margin-bottom: 20px;
        color: #ccc;
        font-size: 14px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    
    .el-col {
        border-radius: 4px;
    }
    
    .bg-purple-dark {
        text-align: center;
        font-size: 22px;
    }
    
    .bg-purple {
        /*background: #d3dce6;*/
    }
    
    .bg-purple img {
        width: 100%;
        height: auto;
    }
    
    .bg-purple-light {
        /*background: #e5e9f2;*/
    }
    
    .bg-purple-light img {
        width: 100%;
        height: auto;
    }
    
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>