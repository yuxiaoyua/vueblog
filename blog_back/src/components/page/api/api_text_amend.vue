<template>
  <div style="width:700px">
<el-form :model="ruleForm2"  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <h3>修改文章</h3>
  <el-form-item label="标题名称">
    <el-input v-model="ruleForm2.article_name"></el-input>
  </el-form-item>
  <el-form-item label="时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm2.time" style="width: 100%;"></el-date-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="是否显示">
    <el-switch v-model="ruleForm2.art_show"></el-switch>
  </el-form-item>
  <el-form-item label="是否推送">
     <el-radio-group v-model="ruleForm2.recommend">
      <el-radio label='是'></el-radio>
      <el-radio label='否'></el-radio>
    </el-radio-group>
  </el-form-item>
    <el-form-item label="作者">
    <el-input v-model="ruleForm2.editer"></el-input>
  </el-form-item>
  <el-form-item label="前言">
    <el-input type="textarea" v-model="ruleForm2.daodu"></el-input>
  </el-form-item>
         <!--editor的div为富文本的承载容器-->
  <el-form-item label='内容'> 
         <div>
            <div id="editor"></div>  
        </div>
    </el-form-item>  
</el-form-item>

<el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
</el-form-item>
</el-form>
  </div>
    

</template>

<script>
    export default {
        data() {
            return {
                ruleForm2: []
            };
        },
        mounted() {
            // 实例化editor编辑器
            this.editor = UE.getEditor('editor');
            this.editor.ready(function() {
                this.editor.setContent(this.ruleForm2.content)
            }.bind(this))
        },
        created() {
            console.log(this.$route.params)
            this.ruleForm2 = this.$route.params
                // console.log(this.ruleForms.recommend);
            if (this.ruleForm2.art_show == 1) {
                this.ruleForm2.art_show = true
            } else {
                this.ruleForm2.art_show = false
            }
            if (this.ruleForm2.recommend == 1) {
                this.ruleForm2.recommend = '是'
            } else {
                this.ruleForm2.recommend = '否'
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm2.content = this.editor.getContentTxt()
                        if (this.ruleForm2.art_show) {
                            this.ruleForm2.art_show = 1
                        } else {
                            this.ruleForm2.art_show = 0
                        }
                        if (this.ruleForm2.recommend == '是') {
                            this.ruleForm2.recommend = 1
                        } else {
                            this.ruleForm2.recommend = 0
                        }
                        this.axios.post("/api/back_article/amendArticle", this.ruleForm2).then(function(data) {
                            if (data.data.code == "3031") {
                                this.open2()
                                this.$router.go(-1)
                            } else {
                                this.open4()
                            }
                        }.bind(this))
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 成功消息提示
            open2() {
                this.$message({
                    message: '恭喜你，修改文章成功',
                    type: 'success'
                });
            },
            // 失败消息提示
            open4() {
                this.$message.error('不好意思，修改失败');
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 20px 0 20px 40px
    }
    
    .textarea {
        width: 400px;
        height: 500px;
    }
</style>