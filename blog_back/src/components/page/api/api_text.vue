<template>
<div>   
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="标题名称">
    <el-input v-model="form.article_name"></el-input>
  </el-form-item>
  <el-form-item label="一级分类">
        <el-select v-model="value" placeholder="请选择" @change='change0'>
            <el-option
            v-for="item in option"
            :key="item.id"
            :label="item.cnname"
            :value="item.id">
            </el-option>
        </el-select>
  </el-form-item>
  <el-form-item label="二级分类">
    <el-select v-model="value1" placeholder="请选择" @change='change1'>
            <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.cnname"
            :value="item.id" 
            >
            </el-option>
        </el-select>
  </el-form-item>
  <el-form-item label="时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="是否显示">
    <el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="是否推送">
    <el-radio-group v-model="form.resource">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
    <el-form-item label="作者">
    <el-input v-model="form.editer"></el-input>
  </el-form-item>
  <el-form-item label="前言">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
         <!--editor的div为富文本的承载容器-->
  <el-form-item label='内容'> 
         <div>
            <div id="editor"></div>  
            <!--<button type="" @click="gettext">点击</button>-->
        </div>
    </el-form-item>  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
    
</div>

</template>
<script>
    export default {
        name: "api_text",
        data() {
            return {
                editor: null,
                form: {
                    article_name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: true,
                    type: [],
                    resource: '是',
                    desc: '',
                    editer: ''
                },
                selectedOptions: [],
                options: [],
                option: [],
                value: '',
                value1: '',
                oldoptions: [],
                oldoption: [],
                enname_one: ''
            }
        },
        mounted() {
            // 实例化editor编辑器
            this.editor = UE.getEditor('editor');
        },
        methods: {
            onSubmit() {
                var _this = this;
                var reso = 1;
                if (this.form.resource == "是") {
                    reso = 1;
                } else {
                    reso = 0;
                }
                var formArt = {
                        oneId: this.value,
                        twoId: this.value1,
                        article_name: this.form.article_name,
                        editer: this.form.editer,
                        content: this.editor.getContentTxt(),
                        time: this.form.date1,
                        daodu: this.form.desc,
                        art_show: Number(this.form.delivery),
                        recommend: Number(reso),
                        imgsrc: "",
                        enname_one: this.enname_one,
                    }
                    // console.log(formArt);
                this.axios.post("/api/back_article/addArticle", formArt).then(function(data) {
                    _this.$message(data.data.msg);
                })
            },
            change0() {
                var arry = [];
                for (var i = 0; i < this.oldoptions.length; i++) {
                    if (this.oldoptions[i].parent_id == this.value) {
                        arry.push(this.oldoptions[i])
                    }
                }
                this.options = arry;
            },
            change1() {
                for (var i = 0; i < this.oldoption.length; i++) {
                    if (this.oldoption[i].id == this.value) {
                        this.enname_one = this.oldoption[i].enname;
                    }
                }
            }
        },
        destroyed() {
            // 将editor进行销毁
            this.editor.destroy();
        },
        created() {
            var _this = this;
            this.axios.get("/api/back_article/getClass").then(function(data) {
                console.log(data.data.data);
                _this.option = data.data.data[0]
                _this.options = data.data.data[1]
                _this.oldoptions = data.data.data[1]
                _this.oldoption = data.data.data[0]
            })
        }
    }
</script>
<style scoped>

</style>